import Kelompok from "../model/KelompokModel.js";

// Mendapatkan semua data kelompok
export const getAllKelompok = async (req, res) => {
  try {
    const data = await Kelompok.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getAllKelompok:", error);
    res.status(500).json({ message: "Failed to fetch kelompok." });
  }
};

// Mendapatkan data kelompok berdasarkan UUID
export const getKelompokByUuid = async (req, res) => {
  const { uuid } = req.params;
  try {
    const data = await Kelompok.findOne(uuid);
    if (!data) {
      return res.status(404).json({ message: "Kelompok not found." });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getKelompokByUuid:", error);
    res.status(500).json({ message: "Failed to fetch kelompok by UUID." });
  }
};

// Mendapatkan data kelompok berdasarkan id_desa
// Mendapatkan data kelompok berdasarkan id_desa
export const getKelompokByIdDesa = async (req, res) => {
  const { id_desa } = req.params;
  try {
    // Mengambil data kelompok berdasarkan id_desa
    const data = await Kelompok.findByIdDesa(id_desa); // Tidak perlu `{ where: { id_desa } }`
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No kelompok found for this id_desa." });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getKelompokByIdDesa:", error);
    res.status(500).json({ message: "Failed to fetch kelompok by id_desa." });
  }
};

// Menambahkan kelompok baru
export const createKelompok = async (req, res) => {
  const { kelompok, id_desa } = req.body;
  if (!kelompok || !id_desa) {
    return res
      .status(400)
      .json({ message: "Kelompok and id_desa are required." });
  }
  try {
    const newKelompok = await Kelompok.create({ kelompok, id_desa });
    res.status(201).json(newKelompok);
  } catch (error) {
    console.error("Error in createKelompok:", error);
    res.status(500).json({ message: "Failed to create kelompok." });
  }
};

// Memperbarui kelompok berdasarkan UUID
export const updateKelompok = async (req, res) => {
  const { uuid } = req.params;
  const { kelompok, id_desa } = req.body;
  if (!kelompok || !id_desa) {
    return res
      .status(400)
      .json({ message: "Kelompok and id_desa are required." });
  }
  try {
    const isUpdated = await Kelompok.update(uuid, { kelompok, id_desa });
    if (!isUpdated) {
      return res
        .status(404)
        .json({ message: "Kelompok not found or not updated." });
    }
    res.status(200).json({ message: "Kelompok updated successfully." });
  } catch (error) {
    console.error("Error in updateKelompok:", error);
    res.status(500).json({ message: "Failed to update kelompok." });
  }
};

// Menghapus kelompok berdasarkan UUID
export const deleteKelompok = async (req, res) => {
  const { uuid } = req.params;
  try {
    const isDeleted = await Kelompok.delete(uuid);
    if (!isDeleted) {
      return res
        .status(404)
        .json({ message: "Kelompok not found or not deleted." });
    }
    res.status(200).json({ message: "Kelompok deleted successfully." });
  } catch (error) {
    console.error("Error in deleteKelompok:", error);
    res.status(500).json({ message: "Failed to delete kelompok." });
  }
};
export const getTotalKelompoknydesa = async (req, res) => {
  try {
    const { id_desa } = req.params; // Mengambil id_desa dari parameter URL
    if (!id_desa) {
      return res.status(400).json({ message: "id_desa is required" }); // Validasi jika id_desa tidak ada
    }

    // Memanggil fungsi model untuk mendapatkan jumlah kelompok berdasarkan id_desa
    const totalKelompok = await Kelompok.findTotalKelompokByIdDesa(id_desa);

    // Mengirimkan response dengan jumlah kelompok
    res.status(200).json({
      message: "Total kelompok for the desa fetched successfully",
      totalKelompok: totalKelompok,
    });
  } catch (error) {
    console.error("Error in getTotalKelompok controller:", error);
    res
      .status(500)
      .json({ message: "Error fetching total kelompok by id_desa" });
  }
};

export const getTotalKelompok = async (req, res) => {
  try {
    const totalKelompok = await Kelompok.getTotalKelompok();
    if (
      totalKelompok === undefined ||
      totalKelompok === null ||
      totalKelompok === 0
    ) {
      return res.status(404).json({ message: "Kelompok not found." });
    }
    res.status(200).json({ totalKelompok }); // Mengirimkan jumlah total Desa dalam response
  } catch (error) {
    console.error("Error in getTotalKelokmpok:", error);
    res.status(500).json({ message: "Failed to fetch total Kelompok." });
  }
};
