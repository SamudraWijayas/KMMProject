import { query } from "../database/db.js";

const Generus = {
  // Mengambil semua data generus
  findAll: async () => {
    const queryStr = `
      SELECT r.id, r.nama, r.id_kelompok, r.id_desa, r.jenjang, r.tgl_lahir, 
             r.jenis_kelamin, r.gol_darah, r.nama_ortu, r.mahasiswa, r.gambar
      FROM generus r
    `;
    try {
      const results = await query(queryStr);
      return results;
    } catch (error) {
      console.error("Error in findAll:", error);
      throw new Error("Failed to fetch all generus.");
    }
  },

  // Menambahkan fungsi untuk mengambil semua generus berdasarkan id_desa
  // Menambahkan fungsi untuk mengambil semua generus berdasarkan id_desa
  findAllByDesa: async (id_desa) => {
    const queryStr = `
    SELECT r.id, r.nama, r.id_kelompok, r.id_desa, r.jenjang, r.tgl_lahir, 
           r.jenis_kelamin, r.gol_darah, r.nama_ortu, r.mahasiswa, r.gambar
    FROM generus r
    WHERE r.id_desa = ? 
  `;
    try {
      const results = await query(queryStr, [id_desa]);
      return results; // Mengembalikan semua data generus yang sesuai dengan id_desa
    } catch (error) {
      console.error("Error in findAllByDesa:", error);
      throw new Error("Failed to fetch generus by desa.");
    }
  },
  findAllByKelompok: async (id_kelompok) => {
    const queryStr = `
    SELECT r.id, r.nama, r.id_kelompok, r.id_desa, r.jenjang, r.tgl_lahir, 
           r.jenis_kelamin, r.gol_darah, r.nama_ortu, r.mahasiswa, r.gambar
    FROM generus r
    WHERE r.id_kelompok = ? 
  `;
    try {
      const results = await query(queryStr, [id_kelompok]);
      return results; // Mengembalikan semua data generus yang sesuai dengan id_desa
    } catch (error) {
      console.error("Error in findAllByDesa:", error);
      throw new Error("Failed to fetch generus by desa.");
    }
  },

  // Mencari generus berdasarkan ID
  findOne: async (id) => {
    const queryStr = `
      SELECT r.id, r.nama, r.id_kelompok, r.id_desa, r.jenjang, r.tgl_lahir, 
             r.jenis_kelamin, r.gol_darah, r.nama_ortu,r.mahasiswa, r.gambar
      FROM generus r
      WHERE r.id = ?
    `;
    try {
      const results = await query(queryStr, [id]);
      return results.length > 0 ? results[0] : null; // Mengembalikan data jika ditemukan
    } catch (error) {
      console.error("Error in findOne:", error);
      throw new Error("Failed to fetch generus by ID.");
    }
  },

  // Menambahkan generus baru
  create: async ({
    nama,
    id_kelompok,
    id_desa,
    jenjang,
    tgl_lahir,
    jenis_kelamin,
    gol_darah,
    nama_ortu,
    gambar,
    mahasiswa,
  }) => {
    const queryStr = `
      INSERT INTO generus 
        (nama, id_kelompok, id_desa, jenjang, tgl_lahir, jenis_kelamin, gol_darah, nama_ortu, mahasiswa, gambar) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const result = await query(queryStr, [
        nama,
        id_kelompok,
        id_desa,
        jenjang,
        tgl_lahir,
        jenis_kelamin,
        gol_darah,
        nama_ortu,
        mahasiswa,
        gambar,
      ]);
      return {
        id: result.insertId,
        nama,
        id_kelompok,
        id_desa,
        jenjang,
        tgl_lahir,
        jenis_kelamin,
        gol_darah,
        nama_ortu,
        mahasiswa,
        gambar,
      }; // Mengembalikan data yang dibuat
    } catch (error) {
      console.error("Error in create:", error);
      throw new Error("Failed to create new generus.");
    }
  },

  // Mengupdate data generus berdasarkan ID
  update: async (
    id,
    nama,
    id_kelompok,
    id_desa,
    jenjang,
    tgl_lahir,
    jenis_kelamin,
    gol_darah,
    nama_ortu,
    mahasiswa,
    gambar
  ) => {
    const queryStr =
      "UPDATE generus SET nama = ?, id_kelompok = ?, id_desa = ?, jenjang = ?, tgl_lahir = ?, jenis_kelamin = ?, gol_darah = ?, nama_ortu = ?, mahasiswa = ?, gambar = ? WHERE id = ?";
    try {
      return await query(queryStr, [
        nama,
        id_kelompok,
        id_desa,
        jenjang,
        tgl_lahir,
        jenis_kelamin,
        gol_darah,
        nama_ortu,
        mahasiswa,
        gambar,
        id,
      ]);
    } catch (error) {
      throw error;
    }
  },

  // Menghapus generus berdasarkan ID
  delete: async (id) => {
    const queryStr = "DELETE FROM generus WHERE id = ?";
    try {
      const result = await query(queryStr, [id]);
      return result.affectedRows > 0; // Mengembalikan true jika ada data yang dihapus
    } catch (error) {
      console.error("Error in delete:", error);
      throw new Error("Failed to delete generus.");
    }
  },

  // Menambahkan fungsi untuk mendapatkan total generus
  getTotalGeneruss: async () => {
    const queryStr = `SELECT COUNT(*) AS totalGenerus FROM generus`; // Query untuk menghitung jumlah generus
    try {
      const results = await query(queryStr);
      if (results && results.length > 0) {
        return results[0].totalGenerus; // Mengambil hasil COUNT(*) dari hasil query
      }
      return 0; // Jika tidak ada hasil, mengembalikan 0
    } catch (error) {
      console.error("Error in getTotalGenerus:", error);
      throw new Error("Failed to get total generus.");
    }
  },
  getTotalGenerusByJenjang: async () => {
    const queryStr = `
      SELECT COUNT(*) AS totalGenerus
      FROM generus
      WHERE jenjang IN ('7', '8', '9', '10', '11', '12', 'Pra Nikah')
    `;
    try {
      const results = await query(queryStr);
      if (results && results.length > 0) {
        return results[0].totalGenerus; // Mengambil hasil COUNT(*) dari hasil query
      }
      return 0; // Jika tidak ada hasil, mengembalikan 0
    } catch (error) {
      console.error("Error in getTotalGenerusByJenjang:", error);
      throw new Error("Failed to get total generus by jenjang.");
    }
  },
  // Menambahkan fungsi untuk mendapatkan total generus berdasarkan id_desa
  getTotalGenerusByDesa: async (id_desa) => {
    const queryStr = `
    SELECT COUNT(*) AS totalGenerus
    FROM generus
    WHERE id_desa = ?
  `;
    try {
      const results = await query(queryStr, [id_desa]);
      if (results && results.length > 0) {
        return results[0].totalGenerus; // Mengambil hasil COUNT(*) dari hasil query
      }
      return 0; // Jika tidak ada hasil, mengembalikan 0
    } catch (error) {
      console.error("Error in getTotalGenerusByDesa:", error);
      throw new Error("Failed to get total generus by desa.");
    }
  },
  getTotalGenerusByJenjangDesa: async (id_desa) => {
    const queryStr = `
      SELECT COUNT(*) AS totalGenerus
      FROM generus
      WHERE jenjang IN ('7', '8', '9', '10', '11', '12', 'Pra Nikah')
        AND id_desa = ?
    `;
    try {
      const results = await query(queryStr, [id_desa]);
      if (results && results.length > 0) {
        return results[0].totalGenerus; // Mengambil hasil COUNT(*) dari hasil query
      }
      return 0; // Jika tidak ada hasil, mengembalikan 0
    } catch (error) {
      console.error("Error in getTotalGenerusByJenjang:", error);
      throw new Error("Failed to get total generus by jenjang and desa.");
    }
  },

  getTotalCaberawit: async (id_desa) => {
    const queryStr = `
      SELECT COUNT(*) AS totalCaberawit
      FROM generus
      WHERE jenjang IN ('1', '2', '3', '4', '5', '6')
        AND id_desa = ?
    `;
    try {
      const results = await query(queryStr, [id_desa]);
      if (results && results.length > 0) {
        return results[0].totalCaberawit; // Mengambil hasil COUNT(*)
      }
      return 0; // Jika tidak ada hasil, kembalikan 0
    } catch (error) {
      console.error("Error in getTotalCaberawit:", error);
      throw new Error("Failed to get total Caberawit for the specified desa.");
    }
  },
  updateJenjang: async (jenjangLama, jenjangBaru) => {
    try {
      await query(`UPDATE generus SET jenjang = ? WHERE jenjang = ?`, [
        jenjangBaru,
        jenjangLama,
      ]);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat memperbarui jenjang:",
        error.message
      );
      throw error;
    }
  },
  updateJenjangAutomatis: async () => {
    const bulanSekarang = new Date().getMonth() + 1; // Mendapatkan bulan sekarang (dimulai dari 0, jadi ditambah 1)

    if (bulanSekarang !== 12) {
      console.log("Bukan bulan Desember, pembaruan jenjang dibatalkan.");
      return; // Jika bukan Desember, tidak perlu melakukan apa-apa
    }

    try {
      // Ambil semua jenjang yang ada di database tanpa duplikat
      const result = await query(`SELECT DISTINCT jenjang FROM generus`);

      if (result.length === 0) {
        console.log("Tidak ada data jenjang di database.");
        return; // Tidak ada data untuk diperbarui
      }

      // Proses pembaruan jenjang
      for (let row of result) {
        const jenjang = row.jenjang;

        // Menghindari pembaruan jenjang 12 menjadi 13 jika sudah diupdate
        if (jenjang === 12) {
          // Mengupdate jenjang 12 menjadi 'Pra Nikah'
          await query(
            `UPDATE generus SET jenjang = 'Pra Nikah' WHERE jenjang = 12`
          );
          console.log("Jenjang 12 berhasil diupdate menjadi 'Pra Nikah'");
        } else if (jenjang >= 2 && jenjang <= 11) {
          const newJenjang = jenjang + 1;
          // Update hanya jenjang yang belum terupdate, menggunakan kondisi WHERE jenjang = jenjang
          await query(
            `UPDATE generus SET jenjang = ? WHERE jenjang = ? AND jenjang = ?`,
            [newJenjang, jenjang, jenjang]
          );
          console.log(
            `Jenjang ${jenjang} berhasil diupdate menjadi ${newJenjang}`
          );
        }
      }

      console.log("Pembaruan jenjang selesai.");
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat memperbarui jenjang:",
        error.message
      );
    }
  },
};

export default Generus;
