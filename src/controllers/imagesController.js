const path = require("path");
const fs = require("fs");


const consultarImagenes = async (req, res) => {
  const nombreArchivo = req.params.nombre;

  try {
    const ruta = path.join(__dirname, "../../public/images", nombreArchivo);

    // Verificar si el archivo existe
    if (!fs.existsSync(ruta)) {
      return res.status(404).json({ msg: "Imagen no encontrada" });
    }

    res.sendFile(ruta);
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al obtener la imagen",
        message: error.message,
      });
    }
  }
};

module.exports = {
  consultarImagenes,
};
