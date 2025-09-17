const authService = require("../services/auth.service");
const { mapRequestToUser, formatUser } = require("../helpers/auth.helpers");

const createUser = async (req, res) => {
  const user = mapRequestToUser(req.body);
  try {
    const { newUser, token } = await authService.createUser(user);
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: {
        user: formatUser(newUser),
        token,
      },
    });
  } catch (error) {
    if (error.message) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Error inesperado al crear el usuario",
        error: error.message || error,
      });
    }
  }
};

const revalidateToken = async (req, res = response) => {
  const tokenObtained = req.header("x-token");

  try {
    const { uid, token, profile } = await authService.revalidateToken(
      tokenObtained
    );

    res.json({
      ok: true,
      id: uid,
      profile,
      token,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: false,
        message: error.message,
      });
    } else {
      // Manejo de otros tipos de errores
      res.status(500).send({
        status: false,
        message: error.message,
      });
    }
  }
};

// LOGIN
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const { uid, token, profiles } = await authService.loginUser(
      email,
      password
    );
    res.json({
      status: true,
      id: uid,
      profiles,
      token,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: false,
        message: error.message,
      });
    } else {
      // Manejo de otros tipos de errores
      res.status(500).send({
        status: false,
        message: error.message,
      });
    }
  }
};

module.exports = {
  createUser,
  revalidateToken,
  loginUser,
};
