import { query } from "../database/db.js";

const Users = {
  findAll: async () => {
    const queryStr =
      "SELECT id, username, role,avatar, id_desa, id_kelompok FROM users";
    try {
      return await query(queryStr);
    } catch (error) {
      throw error;
    }
  },
  findOne: async (userId) => {
    const queryStr =
      "SELECT id, username, role, avatar, id_desa, id_kelompok FROM users WHERE id = ?";
    try {
      const [user] = await query(queryStr, [userId]);
      return user; // Mengembalikan objek user jika ditemukan
    } catch (error) {
      throw error;
    }
  },
  findOnePassword: async (userId) => {
    const queryStr =
      "SELECT id, password FROM users WHERE id = ?";
    try {
      const [user] = await query(queryStr, [userId]);
      return user; // Mengembalikan objek user jika ditemukan
    } catch (error) {
      throw error;
    }
  },

  findUserByUsername: async (username) => {
    const queryStr =
      "SELECT id, username, password, role,avatar, id_desa, id_kelompok FROM users WHERE username = ?";
    try {
      const [user] = await query(queryStr, [username]);
      return user;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (
    username,
    hashedPassword,
    role,
    id_desa = null,
    id_kelompok = null
  ) => {
    const queryStr = `
      INSERT INTO users (username, password, role, id_desa, id_kelompok) 
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      // Validasi agar hanya salah satu dari `id_desa` atau `id_kelompok` yang memiliki nilai sesuai `role`
      if (role === "desa" && id_desa !== null && id_kelompok === null) {
        return await query(queryStr, [
          username,
          hashedPassword,
          role,
          id_desa,
          id_kelompok,
        ]);
      } else if (
        role === "kelompok" &&
        id_kelompok !== null &&
        id_desa === null
      ) {
        return await query(queryStr, [
          username,
          hashedPassword,
          role,
          id_desa,
          id_kelompok,
        ]);
      } else if (
        (role === "admin" || role === "daerah") &&
        id_desa === null &&
        id_kelompok === null
      ) {
        return await query(queryStr, [
          username,
          hashedPassword,
          role,
          id_desa,
          id_kelompok,
        ]);
      } else {
        throw new Error("Role tidak sesuai dengan id_desa atau id_kelompok");
      }
    } catch (error) {
      throw error;
    }
  },

  updateRefreshToken: async (userId, refreshToken) => {
    const queryStr = "UPDATE users SET refresh_token = ? WHERE id = ?";
    try {
      return await query(queryStr, [refreshToken, userId]);
    } catch (error) {
      throw error;
    }
  },

  findUserByRefreshToken: async (refreshToken) => {
    const queryStr =
      "SELECT id, username, password, role,avatar, id_desa, id_kelompok, refresh_token FROM users WHERE refresh_token = ?";
    try {
      const [user] = await query(queryStr, [refreshToken]);
      return user;
    } catch (error) {
      throw error;
    }
  },
  getTotalUsers: async () => {
    const queryStr = `SELECT COUNT(*) AS totalUsers FROM users`; // Query untuk menghitung jumlah generus
    try {
      const results = await query(queryStr);
      if (results && results.length > 0) {
        return results[0].totalUsers; // Mengambil hasil COUNT(*) dari hasil query
      }
      return 0; // Jika tidak ada hasil, mengembalikan 0
    } catch (error) {
      console.error("Error in getUsers:", error);
      throw new Error("Failed to get total users.");
    }
  },
  updateUser: async (userId, username, avatar) => {
    const queryStr = `UPDATE users SET username = ?, avatar = ? WHERE id = ?`;
    try {
      return await query(queryStr, [username, avatar, userId]);
    } catch (error) {
      throw error;
    }
  },

  // Fungsi untuk update password
  updatePassword: async (userId, hashedPassword) => {
    const queryStr = `UPDATE users SET password = ? WHERE id = ?`;
    try {
      return await query(queryStr, [hashedPassword, userId]);
    } catch (error) {
      throw error;
    }
  },
};

export default Users;
