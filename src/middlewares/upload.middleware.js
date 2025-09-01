const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Carpeta destino
const UPLOADS_FOLDER = path.join(__dirname, "../../storage/images");
if (!fs.existsSync(UPLOADS_FOLDER)) fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_FOLDER),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Middleware listo para usar
const upload = multer({ storage });

module.exports = upload;
