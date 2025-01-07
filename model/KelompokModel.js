import { query } from "../database/db.js";
import { v4 as uuidv4 } from "uuid"; // Import fungsi untuk membuat UUID

const Kelompok = {
  // Mengambil semua data kelompok
  findAll: async () => {
    const queryStr = `
      SELECT r.id, r.uuid, r.kelompok, r.id_desa
      FROM kelompok r
    `;
    try {
      const results = await query(queryStr);
      return results;
    } catch (error) {
      console.error("Error in findAll:", error);
      throw new Error("Failed to fetch all kelompok.");
    }
  },

  // Mencari kelompok berdasarkan UUID
  findOne: async (uuid) => {
    const queryStr = `
      SELECT r.id, r.uuid, r.kelompok, r.id_desa
      FROM kelompok r
      WHERE r.uuid = ?
    `;
    try {
      const results = await query(queryStr, [uuid]);
      return results.length > 0 ? results[0] : null; // Mengembalikan data jika ditemukan
    } catch (error) {
      console.error("Error in findOne:", error);
      throw new Error("Failed to fetch kelompok by UUID.");
    }
  },

  // Menambahkan kelompok baru
  create: async ({ kelompok, id_desa }) => {
    const uuid = uuidv4(); // Generate UUID baru
    const queryStr =
      "INSERT INTO kelompok (uuid, kelompok, id_desa) VALUES (?, ?, ?)";
    try {
      const result = await query(queryStr, [uuid, kelompok, id_desa]);
      return { id: result.insertId, uuid, kelompok, id_desa }; // Mengembalikan data yang dibuat
    } catch (error) {
      console.error("Error in create:", error);
      throw new Error("Failed to create new kelompok.");
    }
  },

  // Mengupdate data kelompok berdasarkan UUID
  update: async (uuid, { kelompok, id_desa }) => {
    const queryStr =
      "UPDATE kelompok SET kelompok = ?, id_desa = ? WHERE uuid = ?";
    try {
      const result = await query(queryStr, [kelompok, id_desa, uuid]);
      return result.affectedRows > 0; // Mengembalikan true jika ada data yang diupdate
    } catch (error) {
      console.error("Error in update:", error);
      throw new Error("Failed to update kelompok.");
    }
  },

  // Menghapus kelompok berdasarkan UUID
  delete: async (uuid) => {
    const queryStr = "DELETE FROM kelompok WHERE uuid = ?";
    try {
      const result = await query(queryStr, [uuid]);
      return result.affectedRows > 0; // Mengembalikan true jika ada data yang dihapus
    } catch (error) {
      console.error("Error in delete:", error);
      throw new Error("Failed to delete kelompok.");
    }
  },
  // Mendapatkan kelompok berdasarkan id_desa
  findByIdDesa: async (id_desa) => {
    const queryStr = `
      SELECT r.id, r.uuid, r.kelompok, r.id_desa
      FROM kelompok r
      WHERE r.id_desa = ?
    `;
    try {
      const results = await query(queryStr, [id_desa]);
      return results; // Mengembalikan semua kelompok yang terkait dengan id_desa
    } catch (error) {
      console.error("Error in findByIdDesa:", error);
      throw new Error("Failed to fetch kelompok by id_desa.");
    }
  },
  // Mendapatkan jumlah kelompok berdasarkan id_desa
  findTotalKelompokByIdDesa: async (id_desa) => {
    const queryStr = `
    SELECT COUNT(*) AS totalKelompok
    FROM kelompok r
    WHERE r.id_desa = ?
  `;
    try {
      const results = await query(queryStr, [id_desa]);
      return results[0].totalKelompok; // Mengembalikan jumlah kelompok
    } catch (error) {
      console.error("Error in findTotalKelompokByIdDesa:", error);
      throw new Error("Failed to fetch total kelompok by id_desa.");
    }
  },
  getTotalKelompok: async () => {
    const queryStr = `SELECT COUNT(*) AS totalKelompok FROM kelompok`; // Query untuk menghitung jumlah generus
    try {
      const results = await query(queryStr);
      if (results && results.length > 0) {
        return results[0].totalKelompok; // Mengambil hasil COUNT(*) dari hasil query
      }
      return 0; // Jika tidak ada hasil, mengembalikan 0
    } catch (error) {
      console.error("Error in getKelompok:", error);
      throw new Error("Failed to get total kelompok.");
    }
  },
};

export default Kelompok;
