const authService = require("../services/authService");
const {
  mapRequestToUsuario,
  formatUsuario,
} = require("../helpers/auth.helpers");

const createUser = async (req, res) => {
  const user = mapRequestToUsuario(req.body);

  try {
    const { newUser, token } = await authService.createUser(user);

    console.log(newUser)
    console.log(token)

    res.status(201).json({
      status: "Ok",
      message: "Usuario creado exitosamente",
      data: {
        user: formatUsuario(newUser),
        token,
      },
    });
  } catch (error) {
    if (error.message) {
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: "Error",
        message: "Error inesperado al crear el usuario",
        error: error.message || error,
      });
    }
  }
};

const revalidarToken = async (req, res = response) => {
  const tokenObtenido = req.header("x-token");

  const { uid, token, perfil } = await authService.revalidarToken(
    tokenObtenido
  );

  res.json({
    ok: true,
    id: uid,
    perfil,
    token,
  });
};

// LOGIN
const loginUsuario = async (req, res = response) => {
  const { sEmail, sPassword } = req.body;

  try {
    const { uid, token, perfil } = await authService.loginUsuario(
      sEmail,
      sPassword
    );

    res.json({
      ok: true,
      id: uid,
      perfil,
      token,
    });
  } catch (error) {
    // Si el error es por correo ya registrado

    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      // Manejo de otros tipos de errores
      res.status(500).send({
        status: "Error",
        message: error.message,
      });
    }
  }
};

module.exports = {
  createUser,
  revalidarToken,
  loginUsuario,
};
