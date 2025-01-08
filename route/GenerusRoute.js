import express from "express";
import {
  getAllGenerus,
  getGenerusById,
  createGenerus,
  updateGenerus,
  deleteGenerus,
  getTotalGenerus,
  getTotalGenerusByJenjang,
  getTotalGenerusByDesa,
  getTotalGenerusByJenjangDesa,
  getGenerusByKelompok,
  getGenerusByDesa,
  getTotalCaberawit,
} from "../controller/Generus.js";
import upload from "../middleware/UploadGenerus.js";


const router = express.Router();

// Routes untuk generus
router.get("/api/generus", getAllGenerus); // Mendapatkan semua generus
router.get("/api/generus/kelompok/:id_kelompok", getGenerusByKelompok);
router.get("/api/generus/desa/:id_desa", getGenerusByDesa);
router.get("/api/generus/:id",  getGenerusById); // Mendapatkan generus berdasarkan id
router.post("/api/generus", upload.single("gambar"), createGenerus); // Membuat generus baru

router.put("/api/generus/:id", upload.single("gambar"),updateGenerus); // Mengupdate generus berdasarkan id
router.delete("/api/generus/:id", deleteGenerus); // Menghapus generus berdasarkan id
router.get("/api/totalGenerus", getTotalGenerus); // Endpoint untuk mendapatkan total generus
router.get("/api/totalmumi", getTotalGenerusByJenjang); // Endpoint untuk mendapatkan total generus
router.get("/api/generus/total/:id_desa", getTotalGenerusByDesa);
router.get("/api/generus/total/jenjang/:id_desa", getTotalGenerusByJenjangDesa);
router.get("/api/generus/total/caberawit/:id_desa", getTotalCaberawit);

export default router;
