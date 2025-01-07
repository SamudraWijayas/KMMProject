import jwt from "jsonwebtoken";

// Middleware untuk memverifikasi token JWT
export const verToken = (req, res, next) => {
  const token = req.cookies.accessToken; // Mengambil token dari cookie (pastikan sudah diset saat login)

  if (!token) {
    return res.status(401).json({ msg: "Token tidak ditemukan" });
  }

  // Memverifikasi token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Token tidak valid atau sudah kadaluarsa" });
    }
    req.user = user; // Menyimpan informasi user ke request
    next(); // Melanjutkan ke middleware atau endpoint selanjutnya
  });
};
