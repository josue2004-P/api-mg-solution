const ftp = require("basic-ftp");
require("dotenv").config();

const rutaRaiz = async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      secure: false, // true si usas FTPS
    });

    const currentDir = await client.pwd();

    client.close();

    res.status(200).send({
      status: "Ok",
      message: "Conexión realizada exitosamente",
      currentDir,
    });
  } catch (err) {
    console.error("Error al conectar con el FTP:", err.message);
    res.status(500).send({
      status: "Error",
      message: "No se pudo conectar con el servidor FTP",
      error: err.message,
    });
  } finally {
    client.close(); // Cierra la conexión FTP sí o sí
  }
};

const descargarArchivo = async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      secure: false, // true si usas FTPS
    });

    const remotePath = "/home/josue/hola.txt";

    // Configura encabezados para que el navegador/Postman descargue el archivo
    res.setHeader("Content-Disposition", "attachment; filename=hola.txt");
    res.setHeader("Content-Type", "text/plain");

    // Envía el archivo directamente al cliente (Postman) sin guardarlo en disco
    await client.downloadTo(res, remotePath);
  } catch (err) {
    console.error("Error al descargar archivo:", err.message);
    res.status(500).send({
      status: "Error",
      message: "No se pudo descargar el archivo",
      error: err.message,
    });
  } finally {
    client.close(); // Cierra la conexión FTP sí o sí
  }
};

module.exports = {
  rutaRaiz,
  descargarArchivo,
};
