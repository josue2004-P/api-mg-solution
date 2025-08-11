const userService = require("../services/user.service");
const { toInt } = require("../helpers/toInt");
const { mapRequestToUser, formatUser } = require("../helpers/user.helpers");

// CONTROLLER CREATE USER
const createUser = async (req, res) => {
  const user = mapRequestToUser(req.body);
  try {
    const { newUser, token } = await userService.createUser(user);
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

// CONTROLLER GET ALL USERS
const getAllUsers = async (req, res) => {
  const { first_name, page = 1, limit = 5 } = req.query;

  const filters = {
    first_name,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const data = await userService.getAllUsers(filters);

    res.status(201).send({
      status: "Ok",
      message: "Usuarios obtenidos correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al obtener los usuarios",
        message: error.message,
      });
    }
  }
};

// CONTROLLER GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await userService.getUserById(id);

    res.status(201).send({
      status: "Ok",
      message: "Usuario obtenidos correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al obtener el usuario",
        message: error.message,
      });
    }
  }
};

// CONTROLLER UPDATE USER BY ID
const updateUserById = async (req, res) => {
  const filePath = req.file?.path; // Ruta del archivo subido (si hay)

  try {
    const id = toInt(req.params.id);
    const data = req.body;

    const permiso = await userService.updateUserById(id, data);

    res.status(201).send({
      status: "Ok",
      message: "Usuario editado correctamente",
      data: {
        permiso,
      },
    });
  } catch (error) {
    // Si hay un error y se subió una imagen, eliminarla
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Elimina el archivo
    }

    console.log(error);
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al editadar el usuario",
        message: error.message,
      });
    }
  }
};

// CONTROLLER ACTIVATE USER BY ID
const activateUserById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await userService.activateUserById(id);

    res.status(201).send({
      status: "Ok",
      message: "Usuario activado correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al desactivar a el usuario",
        message: error.message,
      });
    }
  }
};

// CONTROLLER DEACTIVATE USER BY ID
const deactivateUserById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = await userService.deactivateUserById(id);

    res.status(201).send({
      status: "Ok",
      message: "Usuario desactivado correctamente",
      data,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "Error",
        message: "Error inesperado al desactivar a el usuario",
        message: error.message,
      });
    }
  }
};

// CONTROLLER ASSING PROFILE TO THE USER
const assingProfileToTheUser = async (req, res) => {
  const { userId, profilesIds } = req.body; // Ahora esperamos un arreglo de idPerfiles

  try {
    if (!Array.isArray(profilesIds)) {
      return res.status(400).send({
        status: "Error",
        message:
          "El campo 'profilesIds' debe ser un arreglo de IDs de perfiles.",
      });
    }

    const data = await userService.assingProfileToTheUser(
      userId,
      profilesIds
    );

    res.status(201).send({
      status: "Ok",
      message: "Asignación de perfiles procesada exitosamente",
      data
    });
  } catch (error) {
    console.log(error)
    if (error.message) {
      return res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      return res.status(500).send({
        status: "Error",
        message: "Error inesperado al procesar las asignaciones de perfiles.",
        details: error.message,
      });
    }
  }
};

// CONTROLLER GET PROFILES BY USER ID
const getProfilesByUserId = async (req, res) => {
  const id = toInt(req.params.id);
  try {
    const data = await userService.getProfilesByUserId(id);

    res.status(201).send({
      status: "Ok",
      message: "Obtener perfiles exitosamente",
      data,
    });
  } catch (error) {
    // Si el error es por algún detalle específico
    if (error.message) {
      return res.status(400).send({
        status: "Error",
        message: error.message,
      });
    } else {
      // Manejo de otros tipos de errores
      return res.status(500).send({
        status: "Error",
        message: "Error inesperado al procesar la obtencon de perfiles.",
        details: error.message,
      });
    }
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  activateUserById,
  deactivateUserById,
  assingProfileToTheUser,
  getProfilesByUserId,
};
