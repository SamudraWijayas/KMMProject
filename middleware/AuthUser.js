import jwt from "jsonwebtoken";
import Users from "../model/UsersModel.js";

export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log("Authorization Header:", authHeader); // Menambahkan log untuk memeriksa header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda" });
  }

  const token = authHeader.split(" ")[1];
  // console.log("Token:", token); // Menambahkan log untu/k melihat token

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Users.findOne(decoded.userId);

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error); // Menambahkan log untuk melihat kesalahan
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token sudah kadaluarsa" });
    }
    res.status(403).json({ msg: "Token tidak valid" });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token tidak ditemukan, harap login terlebih dahulu." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Token tidak valid." });
    }

    req.userId = decoded.userId; // Menyimpan userId ke dalam request
    next(); // Melanjutkan ke middleware atau controller berikutnya
  });
};

// export const verifyUser = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ msg: "Mohon login ke akun Anda" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     // Verifikasi token
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Cari user berdasarkan userId yang ada di payload token
//     const user = await Users.findOne(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ msg: "User tidak ditemukan" });
//     }

//     // Menyimpan data user di req untuk penggunaan berikutnya
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ msg: "Token sudah kadaluarsa, harap login kembali" });
//     }
//     res.status(403).json({ msg: "Token tidak valid", error: error.message });
//   }
// };

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(404).json({ msg: "User tidak ditemukan" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Akses terlarang" });
  }

  next();
};

// import jwt from "jsonwebtoken";

// // Middleware untuk memverifikasi token JWT untuk semua pengguna
// export const verifyUser = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.status(401).json({ msg: "Akses ditolak, token tidak tersedia" });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ msg: "Token tidak valid" });
//     req.user = decoded; // Simpan data pengguna yang terdekode di req.user
//     next();
//   });
// };

// // Middleware khusus untuk memverifikasi role admin saja
// export const adminOnly = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ msg: "Akses ditolak, token tidak tersedia atau tidak valid" });
//   }

//   if (req.user.role !== "admin") {
//     return res.status(403).json({ msg: "Akses ditolak, hanya admin yang diizinkan" });
//   }

//   next();
// };
