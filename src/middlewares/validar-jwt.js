const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = async (req, res = response, next) => {
  // x-token headers
  const token = req.header("x-token");
  
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }


  next();

};

module.exports = {
  validarJWT,
};
