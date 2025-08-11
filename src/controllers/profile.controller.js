const profileService = require("../services/profile.service");
const { toInt } = require("../helpers/toInt");

// CONTROLLER CREATE PROFILE
const createProfile = async (req, res) => {
  const { name, description } = req.body;

  try {
    const data = await profileService.createProfile(name, description);
    res.status(201).send({
      status: "Ok",
      message: "Perfil creado exitosamente",
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
        message: "Error inesperado al crear el perfil",
        message: error.message,
      });
    }
  }
};

// CONTROLLER GET ALL PROFILES
const getAllProfiles = async (req, res) => {
  const { name, page = 1, limit = 5 } = req.query;

  const filters = {
    name,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const profiles = await profileService.getAllProfiles(filters);

    res.status(201).send({
      status: "Ok",
      message: "Perfiles obtenidos correctamente",
      data: profiles,
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
        message: "Error inesperado al obtener los perfiles",
        message: error.message,
      });
    }
  }
};

// CONTROLLER GET PROFILE BY ID
const getProfileById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const profile = await profileService.getProfileById(id);

    res.status(201).send({
      status: "Ok",
      message: "Perfil obtenido correctamente",
      data: profile,
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
        message: "Error inesperado al obtener los permiso",
        message: error.message,
      });
    }
  }
};

const updateProfileById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = req.body;

    const perfil = await profileService.updateProfileById(id, data);

    res.status(201).send({
      status: "Ok",
      message: `Perfil ${perfil.sNombre} editado correctamente`,
      data: perfil,
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
        message: "Error inesperado al editadar el perfil",
        message: error.message,
      });
    }
  }
};

const deleteProfileById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const profile = await profileService.deleteProfileById(id);

    res.status(201).send({
      status: "Ok",
      message: `Profile ${profile.name} deleted correctly`,
      data: profile,
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
        message: "Error inesperado al eliminar el perfil",
        message: error.message,
      });
    }
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
};
