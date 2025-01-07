import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Fungsi untuk login pengguna
export const Login = async (req, res) => {
  try {
    // Mencari user berdasarkan username
    const user = await Users.findUserByUsername(req.body.username);

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({ msg: "Username tidak terdaftar" });
    }

    // Memeriksa kecocokan password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(404).json({ msg: "Password Salah" });
    }

    // Menyiapkan data untuk payload token
    const userId = user.id;
    const username = user.username;
    const role = user.role;
    const avatar = user.avatar;
    const id_desa = user.id_desa;
    const id_kelompok = user.id_kelompok;

    // Membuat access token dengan masa kadaluarsa 3 jam
    const accessToken = jwt.sign(
      { userId, username, role, avatar, id_desa, id_kelompok },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" } 
    );

    // Mengirimkan access token sebagai response
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Pastikan ini hanya diaktifkan di production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    res.json({ accessToken, role });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getMe = async (req, res) => {
  try {
    // Mengambil userId dari token yang terdekode dan telah disimpan di req.user
    const userId = req.user?.id; // Pastikan req.user ada sebelum mengakses id

    // Jika userId tidak ada, kirimkan error
    if (!userId) {
      return res.status(400).json({ msg: "User ID tidak ditemukan dalam token" });
    }

    // Mencari data pengguna berdasarkan userId
    const user = await Users.findOne(userId);

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Mengembalikan data pengguna yang ditemukan
    res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
      id_desa: user.id_desa,
      id_kelompok: user.id_kelompok,
    });
  } catch (error) {
    // Tangani error dengan detail
    res.status(500).json({ msg: `Terjadi kesalahan pada server: ${error.message}` });
  }
};

// // Fungsi untuk mendapatkan data pengguna yang sedang login
// export const getMe = async (req, res) => {
//   try {
//     // Mengambil userId dari token yang terdekode dan telah disimpan di req.user
//     const userId = req.user.id;

//     // Mencari data pengguna berdasarkan userId
//     const user = await Users.findOne(userId);

//     // Jika user tidak ditemukan
//     if (!user) {
//       return res.status(404).json({ msg: "User tidak ditemukan" });
//     }

//     // Mengembalikan data pengguna yang ditemukan
//     res.status(200).json({
//       id: user.id,
//       username: user.username,
//       role: user.role,
//       avatar: user.avatar,
//       id_desa: user.id_desa,
//       id_kelompok: user.id_kelompok
//     });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const Logout = async (req, res) => {
  try {
    // Menghapus token dari sisi klien, biasanya dilakukan di front-end
    // Di sisi server, dapat digunakan untuk menambahkan token ke daftar blokir (blacklist) jika diimplementasikan
    res.clearCookie("token"); // Membersihkan cookie jika token disimpan di sana
    res.status(200).json({ msg: "Berhasil logout" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
