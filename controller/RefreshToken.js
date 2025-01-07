import Users from "../model/UsersModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401); // Unauthorized jika tidak ada refresh token

    // Cari user berdasarkan refresh token di database
    const user = await Users.findUserByRefreshToken(refreshToken); // Menggunakan fungsi custom

    if (!user) return res.sendStatus(403); // Forbidden jika user tidak ditemukan atau refresh token tidak valid

    // Verifikasi refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden jika verifikasi gagal

        // Jika berhasil, buat access token baru
        const userId = user.id;
        const username = user.username;
        const role = user.role; // Tambahkan role dari database
        const avatar = user.avatar; // Tambahkan role dari database

        const accessToken = jwt.sign(
          { userId, username, role, avatar },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" } // Expire dalam 15 detik
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error jika ada masalah di server
  }
};
