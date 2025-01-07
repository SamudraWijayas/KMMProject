import jwt from "jsonwebtoken";

// Middleware untuk memverifikasi token
export const verifyToken = (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "Token not provided" }); // Jika tidak ada token
    }

    // Ekstrak token dari header Authorization
    const token = authHeader.split(" ")[1]; // Format: Bearer <token>
    if (!token) {
      return res.status(401).json({ msg: "Token format is invalid" }); // Jika format token salah
    }

    // Verifikasi token menggunakan secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Token expired" }); // Token telah kadaluarsa
        }
        return res.status(403).json({ msg: "Invalid token" }); // Token tidak valid
      }

      // Jika token valid, simpan data yang terdecode ke dalam req.user
      req.user = decoded;

      console.log("Verified token:", decoded); // Debug: Log data dari token yang sudah diverifikasi
      next(); // Lanjut ke middleware berikutnya
    });
  } catch (error) {
    console.error("Error verifying token:", error); // Debug: Log error
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   // Pastikan authHeader memiliki nilai dan benar-benar berisi kata "Bearer"
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.sendStatus(401); // Unauthorized jika tidak ada token atau format salah
//   }

//   // Pisahkan token setelah "Bearer "
//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403); // Forbidden jika verifikasi gagal

//     req.username = decoded.username; // Menyimpan username ke objek req untuk digunakan di middleware berikutnya
//     next(); // Melanjutkan ke handler berikutnya jika token valid
//   });
// };

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken; // Ambil token dari cookie
//   if (!token) {
//     return res.status(403).json({ msg: "Akses ditolak, Anda belum login" });
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ msg: "Token tidak valid atau sudah kadaluarsa" });
//     }
//     req.user = user; // Simpan data pengguna di request
//     next();
//   });
// };
