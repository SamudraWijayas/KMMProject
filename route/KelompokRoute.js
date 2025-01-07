import express from "express";
import {
  getAllKelompok,
  getKelompokByUuid,
  createKelompok,
  updateKelompok,
  deleteKelompok,
  getKelompokByIdDesa,
  getTotalKelompoknydesa,
  getTotalKelompok,
} from "../controller/Kelompok.js";

const router = express.Router();

// Routes untuk Kelompok
router.get("/kelompok", getAllKelompok); // Mendapatkan semua Kelompok
router.get("/kelompok/:uuid", getKelompokByUuid); // Mendapatkan Kelompok berdasarkan UUID
router.post("/kelompok", createKelompok); // Membuat Kelompok baru
router.put("/kelompok/:uuid", updateKelompok); // Mengupdate Kelompok berdasarkan UUID
router.delete("/kelompok/:uuid", deleteKelompok); // Menghapus Kelompok berdasarkan UUID
router.get("/kelompok/desa/:id_desa", getKelompokByIdDesa); // Ini rutenya
router.get("/kelompok/total/:id_desa", getTotalKelompoknydesa);
router.get("/totalKelompok", getTotalKelompok); // Endpoint untuk mendapatkan total generus

export default router;
