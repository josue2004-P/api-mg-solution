// importar axios
const axios = require("axios");

// Función para consultar la API externa
const consultarApiExterna = async () => {
  const url = "https://rodall.com:444/SagaWS.NetEnvironmet/rest/sagaWSRef/";

  const headers = {
    "Content-Type": "application/json",
    User: "RODALL",
    Password: "8888888888",
    "Cache-Control": "no-cache",
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
  };

  const data = {
    ClienteNo: 1,
    TipoFecha: 1,
    FechaInicial: "01/01/2022",
    FechaFinal: "31/01/2022",
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log("Respuesta:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al consultar la API externa:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Exportar la función
module.exports = {
  consultarApiExterna,
};
