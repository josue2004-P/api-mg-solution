const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req, res = response, next) => {
  // x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token provided in the request", // mensaje traducido
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid or expired token",
    });
  }
};

module.exports = {
  validateJWT,
};
