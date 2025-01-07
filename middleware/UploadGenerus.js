import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/generus"); // Menyimpan gambar di folder "uploads"
  },
  filename: (req, file, cb) => {
    // Menambahkan timestamp di nama file agar unik
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter file yang diterima hanya untuk gambar (JPG, JPEG, PNG)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const mimeTypeMatch = allowedFileTypes.test(file.mimetype);
  const extNameMatch = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeTypeMatch && extNameMatch) {
    return cb(null, true); // Menerima file
  }
  cb(new Error("Hanya file .jpeg, .jpg, dan .png yang diizinkan!")); // Menolak file
};

// Membuat middleware multer dengan konfigurasi di atas
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Batasi ukuran file menjadi 5MB
});

export default upload;
