import Generus from "../model/GenerusModel.js"; // Mengimpor model Generus
import fs from "fs"; // Import module fs untuk manipulasi file
import upload from "../middleware/UploadGenerus.js";
import path from "path";

export const createGenerus = async (req, res) => {
  const {
    nama,
    id_kelompok,
    id_desa,
    jenjang,
    tgl_lahir,
    jenis_kelamin,
    gol_darah,
    nama_ortu,
    mahasiswa,
  } = req.body;

  // Check if the required fields are provided
  if (
    !nama ||
    !id_kelompok ||
    !id_desa ||
    !jenjang ||
    !tgl_lahir ||
    !jenis_kelamin ||
    !gol_darah ||
    !nama_ortu ||
    !mahasiswa
  ) {
    return res.status(400).json({ msg: "All fields are required!" });
  }

  const gambar = req.file ? `/uploads/generus/${req.file.filename}` : null; // Path for the image file

  try {
    // Create the new generus in the database
    const generus = await Generus.create({
      nama,
      id_kelompok,
      id_desa,
      jenjang,
      tgl_lahir,
      jenis_kelamin,
      gol_darah,
      nama_ortu,
      mahasiswa,
      gambar, // Include image if uploaded
    });

    res.status(201).json({ msg: "Generus successfully added", data: generus });
  } catch (error) {
    // Delete uploaded image if any error occurs
    if (gambar) {
      try {
        fs.unlinkSync(path.join(__dirname, `.${gambar}`)); // Ensure correct path
      } catch (fileError) {
        console.error("Error deleting file:", fileError.message);
      }
    }
    res.status(400).json({ msg: error.message });
  }
};

// Mendapatkan semua data generus
export const getAllGenerus = async (req, res) => {
  try {
    const data = await Generus.findAll();
    res.status(200).json(data); // Mengirimkan data yang didapatkan dari model
  } catch (error) {
    console.error("Error in getAllGenerus:", error);
    res.status(500).json({ message: "Failed to fetch generus." });
  }
};

// Controller untuk mendapatkan semua data generus berdasarkan desa
export const getGenerusByDesa = async (req, res) => {
  const { id_desa } = req.params; // Mengambil id_desa dari parameter URL

  try {
    // Panggil fungsi findAllByDesa dari model Generus untuk mengambil data generus berdasarkan id_desa
    const generusList = await Generus.findAllByDesa(id_desa);

    if (generusList.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada data generus ditemukan untuk desa ini." });
    }

    // Mengembalikan data generus yang ditemukan dalam format JSON
    return res.status(200).json(generusList);
  } catch (error) {
    console.error("Error fetching generus by desa:", error);
    return res
      .status(500)
      .json({ message: "Gagal mengambil data generus berdasarkan desa." });
  }
};
export const getGenerusByKelompok = async (req, res) => {
  const { id_kelompok } = req.params; // Mengambil id_desa dari parameter URL

  try {
    // Panggil fungsi findAllByDesa dari model Generus untuk mengambil data generus berdasarkan id_desa
    const generusList = await Generus.findAllByKelompok(id_kelompok);

    if (generusList.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada data generus ditemukan untuk desa ini." });
    }

    // Mengembalikan data generus yang ditemukan dalam format JSON
    return res.status(200).json(generusList);
  } catch (error) {
    console.error("Error fetching generus by desa:", error);
    return res
      .status(500)
      .json({ message: "Gagal mengambil data generus berdasarkan desa." });
  }
};

// Mendapatkan data generus berdasarkan ID
export const getGenerusById = async (req, res) => {
  const { id } = req.params; // Menggunakan ID sebagai parameter
  try {
    const data = await Generus.findOne(id); // Mengambil data berdasarkan ID
    if (!data) {
      return res.status(404).json({ message: "Generus not found." });
    }
    res.status(200).json(data); // Mengirimkan data generus
  } catch (error) {
    console.error("Error in getGenerusById:", error);
    res.status(500).json({ message: "Failed to fetch generus by ID." });
  }
};

// Menambahkan generus baru
// export const createGenerus = async (req, res) => {
//   const {
//     nama,
//     id_kelompok,
//     id_desa,
//     jenjang,
//     tgl_lahir,
//     jenis_kelamin,
//     gol_darah,
//     nama_ortu,
//   } = req.body;

//   // Validasi input
//   if (
//     !nama ||
//     !id_kelompok ||
//     !id_desa ||
//     !jenjang ||
//     !tgl_lahir ||
//     !jenis_kelamin ||
//     !gol_darah ||
//     !nama_ortu
//   ) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   // Upload gambar menggunakan middleware
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }

//     // Pastikan gambar di-upload
//     const gambar = req.file ? `/uploads/generus/${req.file.filename}` : null;

//     try {
//       const newGenerus = await Generus.create({
//         nama,
//         id_kelompok,
//         id_desa,
//         jenjang,
//         tgl_lahir,
//         jenis_kelamin,
//         gol_darah,
//         nama_ortu,
//         gambar, // Menyimpan path gambar ke dalam database
//       });
//       res.status(201).json(newGenerus); // Mengirimkan data yang baru dibuat
//     } catch (error) {
//       // Jika ada error, hapus gambar yang sudah di-upload
//       if (gambar) {
//         fs.unlinkSync(`.${gambar}`);
//       }
//       console.error("Error in createGenerus:", error);
//       res.status(500).json({ message: "Failed to create generus." });
//     }
//   });
// };
// export const createGenerus = async (req, res) => {
//   const {
//     nama,
//     id_kelompok,
//     id_desa,
//     jenjang,
//     tgl_lahir,
//     jenis_kelamin,
//     gol_darah,
//     nama_ortu,
//     gambar,
//   } = req.body;

//   // Validasi input
//   if (
//     !nama ||
//     !id_kelompok ||
//     !id_desa ||
//     !jenjang ||
//     !tgl_lahir ||
//     !jenis_kelamin ||
//     !gol_darah ||
//     !nama_ortu ||
//     !gambar
//   ) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     const newGenerus = await Generus.create({
//       nama,
//       id_kelompok,
//       id_desa,
//       jenjang,
//       tgl_lahir,
//       jenis_kelamin,
//       gol_darah,
//       nama_ortu,
//       gambar,
//     });
//     res.status(201).json(newGenerus); // Mengirimkan data yang baru dibuat
//   } catch (error) {
//     console.error("Error in createGenerus:", error);
//     res.status(500).json({ message: "Failed to create generus." });
//   }
// };

// Memperbarui data generus berdasarkan ID


export const updateGenerus = async (req, res) => {
  const { id } = req.params;
  const {
    nama,
    id_kelompok,
    id_desa,
    jenjang,
    tgl_lahir,
    jenis_kelamin,
    gol_darah,
    nama_ortu,
    mahasiswa,
  } = req.body;

  let gambar = null;

  // Jika ada file yang diupload
  if (req.file) {
    gambar = `/uploads/generus/${req.file.filename}`; // Path dengan awalan tertentu
  }

  try {
    const generus = await Generus.findOne(id);
    if (!generus)
      return res.status(404).json({ msg: "Generus tidak ditemukan" });

    // Hapus gambar lama jika ada dan mengganti dengan gambar baru
    if (gambar && generus.gambar) {
      const oldImagePath = generus.gambar.replace(/\\/g, "/");
      if (fs.existsSync(`.${oldImagePath}`)) {
        fs.unlinkSync(`.${oldImagePath}`);
      }
    }

    // Update data generus dengan data baru
    await Generus.update(
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
      gambar || generus.gambar // Gunakan gambar baru jika ada, jika tidak gunakan gambar lama
    );

    res.status(200).json({ msg: "Generus berhasil diupdate" });
  } catch (error) {
    // Jika terjadi error, hapus gambar yang telah di-upload
    if (gambar) {
      const newImagePath = gambar.replace(/\\/g, "/");
      if (fs.existsSync(`.${newImagePath}`)) {
        fs.unlinkSync(`.${newImagePath}`);
      }
    }

    res.status(500).json({ msg: error.message });
  }
};



export const deleteGenerus = async (req, res) => {
  const { id } = req.params;
  try {
    const generus = await Generus.findOne(id);
    if (!generus) return res.status(404).json({ msg: "Generus tidak ditemukan" });

    // Hapus gambar terkait sebelum menghapus resep
    if (generus.gambar) {
      try {
        fs.unlinkSync(`.${generus.gambar}`);
      } catch (err) {
        console.error("Failed to delete gambar:", err);
      }
    }

    await Generus.delete(id);
    res.status(200).json({ msg: "Generus berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/// Mendapatkan total generus
export const getTotalGenerus = async (req, res) => {
  try {
    const totalGenerus = await Generus.getTotalGeneruss();
    if (
      totalGenerus === undefined ||
      totalGenerus === null ||
      totalGenerus === 0
    ) {
      return res.status(404).json({ message: "Generus not found." });
    }
    res.status(200).json({ totalGenerus }); // Mengirimkan jumlah total generus dalam response
  } catch (error) {
    console.error("Error in getTotalGenerus:", error);
    res.status(500).json({ message: "Failed to fetch total generus." });
  }
};

export const getTotalGenerusByJenjang = async (req, res) => {
  try {
    const totalMumi = await Generus.getTotalGenerusByJenjang(); // Memanggil fungsi dari model
    return res.status(200).json({
      success: true,
      message: "Total generus with jenjang 11, 12, 13 fetched successfully",
      totalMumi,
    });
  } catch (error) {
    console.error("Error in getTotalGenerusByJenjang controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch total generus by jenjang",
      error: error.message,
    });
  }
};
export const getTotalGenerusByDesa = async (req, res) => {
  try {
    const { id_desa } = req.params; // Mengambil id_desa dari parameter URL
    if (!id_desa) {
      return res.status(400).json({ message: "id_desa is required" }); // Validasi jika id_desa tidak ada
    }

    // Memanggil fungsi model untuk mendapatkan total generus berdasarkan id_desa
    const totalGenerus = await Generus.getTotalGenerusByDesa(id_desa);

    // Mengirimkan response berupa jumlah generus
    res.status(200).json({
      message: "Total generus by desa fetched successfully",
      totalGenerus: totalGenerus,
    });
  } catch (error) {
    console.error("Error in getTotalGenerusByDesa controller:", error);
    res.status(500).json({ message: "Error fetching total generus by desa" });
  }
};
export const getTotalGenerusByJenjangDesa = async (req, res) => {
  try {
    const { id_desa } = req.params; // Mengambil id_desa dari parameter URL
    if (!id_desa) {
      return res.status(400).json({ message: "id_desa is required" }); // Validasi jika id_desa tidak ada
    }

    // Memanggil fungsi model untuk mendapatkan total generus berdasarkan id_desa dan jenjang
    const totalMumi = await Generus.getTotalGenerusByJenjangDesa(id_desa);

    // Mengirimkan response berupa jumlah generus
    res.status(200).json({
      message: "Total generus by jenjang and desa fetched successfully",
      totalMumi: totalMumi,
    });
  } catch (error) {
    console.error("Error in getTotalGenerusByJenjang controller:", error);
    res
      .status(500)
      .json({ message: "Error fetching total generus by jenjang and desa" });
  }
};

export const getTotalCaberawit = async (req, res) => {
  try {
    const { id_desa } = req.params; // Ambil id_desa dari parameter URL
    if (!id_desa) {
      return res.status(400).json({ message: "id_desa is required" });
    }

    // Panggil fungsi model untuk mendapatkan total Caberawit
    const totalCaberawit = await Generus.getTotalCaberawit(id_desa);

    res.status(200).json({
      message: "Total Caberawit for the desa fetched successfully",
      totalCaberawit: totalCaberawit,
    });
  } catch (error) {
    console.error("Error in getTotalCaberawit controller:", error);
    res.status(500).json({
      message: "Error fetching total Caberawit for the desa.",
    });
  }
};

export const updateJenjangAutomatis = async (req, res) => {
  try {
    // Panggil fungsi updateJenjangAutomatis dari model Generus
    await Generus.updateJenjangAutomatis();

    // Kirim respon sukses
    res.status(200).json({
      message: "Jenjang berhasil diperbarui untuk bulan Mei.",
    });
  } catch (error) {
    console.error("Error in updateJenjangAutomatisController:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui jenjang.",
      error: error.message,
    });
  }
};
