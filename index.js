import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { testConnection } from "./database/db.js";
import router from "./route/index.js";
import './cronJob.js'

dotenv.config();
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";
    if (req.path.includes("/uploadGenerusImage")) {
      uploadPath += "artikel/";
    } else if (req.path.includes("/uploadRecipeImage")) {
      uploadPath += "resep/";
    } else if (req.path.includes("/users")) {
      uploadPath += "profil/";
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Menyajikan folder uploads secara statis
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ msg: "Terjadi kesalahan pada server", error: err.message });
});

app.listen(process.env.APP_PORT, () => {
  testConnection();
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
