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
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        ok: false,
        msg: "El token ha expirado",
      });
    }

    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
