import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import upload from "../middleware/UploadAvatar.js";
import path from "path";
import fs from "fs"; // Import module fs untuk manipulasi file

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk login pengguna
export const Login = async (req, res) => {
  try {
    const user = await Users.findUserByUsername(req.body.username);

    if (!user) {
      return res.status(404).json({ msg: "Username tidak terdaftar" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(404).json({ msg: "Password Salah" });
    }

    const userId = user.id;
    const username = user.username;
    const role = user.role;
    const avatar = user.avatar;
    const id_desa = user.id_desa;
    const id_kelompok = user.id_kelompok;

    const accessToken = jwt.sign(
      { userId, username, role, avatar, id_desa, id_kelompok },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" } // Token kadaluarsa setelah 3 jam
    );

    res.json({ accessToken, role });
  } catch (error) {
    console.error(error); // Pastikan error tercatat di log
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk update username dan avatar
export const updateUser = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file); // Pastikan file diterima di sini

  const userId = req.user?.id;
  const username = req.body.username || "";

  try {
    const user = await Users.findOne(userId);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    // Pastikan path dimulai dengan "/uploads/profile/"
    const updatedAvatar = req.file
      ? `/uploads/profil/${req.file.filename}` // Buat path baru dengan awalan yang diinginkan
      : user.avatar;

    const updatedUser = await Users.updateUser(userId, username, updatedAvatar);

    res.status(200).json({ msg: "User berhasil diupdate", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk update password
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(400)
      .json({ msg: "User ID tidak ditemukan. Pastikan Anda login." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ msg: "Password baru tidak cocok." });
  }

  try {
    const user = await Users.findOnePassword(userId);

    if (!user || !user.password) {
      return res
        .status(404)
        .json({ msg: "User tidak ditemukan atau password tidak valid." });
    }

    // Debugging log
    console.log("Old Password (from request):", oldPassword);
    console.log("Hashed Password (from database):", user.password);

    if (!oldPassword) {
      return res.status(400).json({ msg: "Password lama diperlukan." });
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Password lama salah." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Users.updatePassword(userId, hashedPassword);

    res.status(200).json({ msg: "Password berhasil diupdate" });
  } catch (error) {
    console.error("Error in updatePassword:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server." });
  }
};

// Fungsi untuk register pengguna baru
export const Register = async (req, res) => {
  const { username, password, confPassword, role, id_desa, id_kelompok } =
    req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password tidak cocok" });
  }

  try {
    const existingUser = await Users.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ msg: "Username sudah terdaftar" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validasi role dan ID terkait
    if (role === "desa" && id_desa && !id_kelompok) {
      await Users.createUser(username, hashedPassword, role, id_desa, null);
    } else if (role === "kelompok" && id_kelompok && !id_desa) {
      await Users.createUser(username, hashedPassword, role, null, id_kelompok);
    } else if (
      (role === "admin" || role === "daerah") &&
      !id_desa &&
      !id_kelompok
    ) {
      await Users.createUser(username, hashedPassword, role, null, null);
    } else {
      return res
        .status(400)
        .json({ msg: "Role dan ID desa/kelompok tidak valid" });
    }

    res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await Users.getTotalUsers();
    if (totalUsers === undefined || totalUsers === null || totalUsers === 0) {
      return res.status(404).json({ message: "Desa not found." });
    }
    res.status(200).json({ totalUsers }); // Mengirimkan jumlah total Desa dalam response
  } catch (error) {
    console.error("Error in totalUsers:", error);
    res.status(500).json({ message: "Failed to fetch total user." });
  }
};
