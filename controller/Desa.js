import Desa from "../model/DesaModel.js";

// Mendapatkan semua desa
export const getAllDesa = async (req, res) => {
  try {
    const results = await Desa.findAll();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

// Mendapatkan desa berdasarkan UUID
export const getDesaByUuid = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await Desa.findOne(uuid);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "Data desa tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

// Membuat desa baru
export const createDesa = async (req, res) => {
  const { desa } = req.body;
  try {
    await Desa.create({ desa });
    res.status(201).json({ msg: "Desa berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Mengupdate desa berdasarkan UUID
export const updateDesa = async (req, res) => {
  const { uuid } = req.params;
  const { desa } = req.body;
  try {
    const result = await Desa.update(uuid, desa);
    if (result.affectedRows > 0) {
      res.status(200).json({ msg: "Desa berhasil diperbarui" });
    } else {
      res.status(404).json({ msg: "Data desa tidak ditemukan" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Menghapus desa berdasarkan UUID
export const deleteDesa = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await Desa.delete(uuid);
    if (result.affectedRows > 0) {
      res.status(200).json({ msg: "Desa berhasil dihapus" });
    } else {
      res.status(404).json({ msg: "Data desa tidak ditemukan" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const getTotalDesa = async (req, res) => {
  try {
    const totalDesa = await Desa.getTotalDesa();
    if (
      totalDesa === undefined ||
      totalDesa === null ||
      totalDesa === 0
    ) {
      return res.status(404).json({ message: "Desa not found." });
    }
    res.status(200).json({ totalDesa }); // Mengirimkan jumlah total Desa dalam response
  } catch (error) {
    console.error("Error in getTotalDesa:", error);
    res.status(500).json({ message: "Failed to fetch total Desa." });
  }
};
