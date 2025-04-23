const path = require("path");
const fs = require("fs");

const verPdf = (req, res) => {
  const nombreArchivo = req.params.nombre;
  const ruta = path.join(__dirname, "../../public/pdfs", nombreArchivo);

  if (!fs.existsSync(ruta)) {
    return res.status(404).json({
      status: "Error",
      message: "PDF no encontrado",
    });
  }

  res.sendFile(ruta);
};

module.exports = {
  verPdf,
};