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
router.get("/api/kelompok", getAllKelompok); // Mendapatkan semua Kelompok
router.get("/api/kelompok/:uuid", getKelompokByUuid); // Mendapatkan Kelompok berdasarkan UUID
router.post("/api/kelompok", createKelompok); // Membuat Kelompok baru
router.put("/api/kelompok/:uuid", updateKelompok); // Mengupdate Kelompok berdasarkan UUID
router.delete("/api/kelompok/:uuid", deleteKelompok); // Menghapus Kelompok berdasarkan UUID
router.get("/api/kelompok/desa/:id_desa", getKelompokByIdDesa); // Ini rutenya
router.get("/api/kelompok/total/:id_desa", getTotalKelompoknydesa);
router.get("/api/totalKelompok", getTotalKelompok); // Endpoint untuk mendapatkan total generus

export default router;
