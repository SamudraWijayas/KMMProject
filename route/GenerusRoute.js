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
router.get("/generus", getAllGenerus); // Mendapatkan semua generus
router.get("/generus/kelompok/:id_kelompok", getGenerusByKelompok);
router.get("/generus/desa/:id_desa", getGenerusByDesa);
router.get("/generus/:id",  getGenerusById); // Mendapatkan generus berdasarkan id
router.post("/generus", upload.single("gambar"), createGenerus); // Membuat generus baru

router.put("/generus/:id", upload.single("gambar"),updateGenerus); // Mengupdate generus berdasarkan id
router.delete("/generus/:id", deleteGenerus); // Menghapus generus berdasarkan id
router.get("/totalGenerus", getTotalGenerus); // Endpoint untuk mendapatkan total generus
router.get("/totalmumi", getTotalGenerusByJenjang); // Endpoint untuk mendapatkan total generus
router.get("/generus/total/:id_desa", getTotalGenerusByDesa);
router.get("/generus/total/jenjang/:id_desa", getTotalGenerusByJenjangDesa);
router.get("/generus/total/caberawit/:id_desa", getTotalCaberawit);

export default router;
