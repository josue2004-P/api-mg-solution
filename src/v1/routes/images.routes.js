const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const upload = require("../../middlewares/upload.middleware");

const IMAGES_FOLDER = path.join(__dirname, "../../../storage/images");

const SECRET = process.env.SECRET_JWT_SEED;

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No se subió archivo" });

  res.json({
    message: "Imagen Guardado Correctamente"
  });
});

// Simulación de DB
const images = [
  { filename: "1756767693371.jpg", usuarioId: 1 },
];

// Endpoint para listar imágenes con URLs firmadas
router.get("/", (req, res) => {
  const userImages = images.filter(img => img.usuarioId === 1);

  const urls = userImages.map(img => {
    const token = jwt.sign({ file: img.filename }, SECRET);
    return {
      filename: img.filename,
      url: `http://localhost:3000/api/v1/images/uploads-signed/${img.filename}?token=${token}`
    };
  });
  res.json(urls);
});

// Endpoint para servir imágenes firmadas
router.get("/uploads-signed/:filename", (req, res) => {
  const { token } = req.query;
  const { filename } = req.params;
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.file !== filename) return res.status(403).json({ error: "Token inválido" });

    const filePath = path.join(IMAGES_FOLDER, filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Archivo no encontrado" });

    res.sendFile(filePath);
  } catch (err) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
});

module.exports = router;
