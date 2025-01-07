import { query } from "../database/db.js";
import { v4 as uuidv4 } from "uuid"; // Import fungsi uuidv4 untuk membuat UUID

const Desa = {
  // Mengambil semua data desa
  findAll: async () => {
    const queryStr = `
      SELECT r.id, r.uuid, r.desa
      FROM desa r
    `;
    try {
      return await query(queryStr);
    } catch (error) {
      throw error;
    }
  },

  // Mencari desa berdasarkan UUID
  findOne: async (uuid) => {
    const queryStr = `
      SELECT r.id, r.uuid, r.desa
      FROM desa r
      WHERE r.uuid = ?
    `;
    try {
      const results = await query(queryStr, [uuid]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw error;
    }
  },

  // Menambahkan desa baru
  create: async ({ desa }) => {
    const uuid = uuidv4(); // Generate UUID baru
    const queryStr = "INSERT INTO desa (uuid, desa) VALUES (?, ?)";
    try {
      return await query(queryStr, [uuid, desa]);
    } catch (error) {
      throw error;
    }
  },

  // Mengupdate data desa berdasarkan UUID
  update: async (uuid, desa) => {
    const queryStr = "UPDATE desa SET desa = ? WHERE uuid = ?";
    try {
      return await query(queryStr, [desa, uuid]);
    } catch (error) {
      throw error;
    }
  },

  // Menghapus desa berdasarkan UUID
  delete: async (uuid) => {
    const queryStr = "DELETE FROM desa WHERE uuid = ?";
    try {
      return await query(queryStr, [uuid]);
    } catch (error) {
      throw error;
    }
  },
  getTotalDesa: async () => {
    const queryStr = `SELECT COUNT(*) AS totalDesa FROM desa`; // Query untuk menghitung jumlah generus
    try {
      const results = await query(queryStr);
      if (results && results.length > 0) {
        return results[0].totalDesa; // Mengambil hasil COUNT(*) dari hasil query
      }
      return 0; // Jika tidak ada hasil, mengembalikan 0
    } catch (error) {
      console.error("Error in getDesa:", error);
      throw new Error("Failed to get total desa.");
    }
  },
};

export default Desa;
