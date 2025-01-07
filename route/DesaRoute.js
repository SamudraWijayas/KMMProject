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
router.get("/desa", getAllDesa); // Mendapatkan semua desa
router.get("/desa/:uuid", getDesaByUuid); // Mendapatkan desa berdasarkan UUID
router.post("/desa", createDesa); // Membuat desa baru
router.put("/desa/:uuid", updateDesa); // Mengupdate desa berdasarkan UUID
router.delete("/desa/:uuid", deleteDesa); // Menghapus desa berdasarkan UUID
router.get("/totalDesa", getTotalDesa); // Endpoint untuk mendapatkan total generus

export default router;
