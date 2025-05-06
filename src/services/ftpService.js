const ftp = require("basic-ftp");
require("dotenv").config();

async function descargarDesdeFTP(remotePath, outputStream) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      secure: false,
    });

    await client.downloadTo(outputStream, remotePath);
  } catch (err) {
    throw new Error("Error al descargar desde FTP: " + err.message);
  } finally {
    client.close();
  }
}

module.exports = {
  descargarDesdeFTP,
};