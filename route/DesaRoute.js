import express from "express";
import {
  getAllDesa,
  getDesaByUuid,
  createDesa,
  updateDesa,
  deleteDesa,
  getTotalDesa,
} from "../controller/Desa.js";

const router = express.Router();

// Routes untuk desa
router.get("/api/desa", getAllDesa); // Mendapatkan semua desa
router.get("/api/desa/:uuid", getDesaByUuid); // Mendapatkan desa berdasarkan UUID
router.post("/api/desa", createDesa); // Membuat desa baru
router.put("/api/desa/:uuid", updateDesa); // Mengupdate desa berdasarkan UUID
router.delete("/api/desa/:uuid", deleteDesa); // Menghapus desa berdasarkan UUID
router.get("/api/totalDesa", getTotalDesa); // Endpoint untuk mendapatkan total generus

export default router;
