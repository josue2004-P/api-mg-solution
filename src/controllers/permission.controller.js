const permissionService = require("../services/permission.service");
const { toInt } = require("../helpers/toInt");

// CONTROLLER CREATE PERMISSION
const createPermission = async (req, res) => {
  const { name, description } = req.body;
  try {
    const data = await permissionService.createPermission(name, description);
    res.status(201).send({
      status: "Ok",
      message: "Permiso creado exitosamente",
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
        message: "Error inesperado al crear el permiso",
        message: error.message,
      });
    }
  }
};

// CONTROLLER GET ALL PERMISSIONS
const getAllPermissions = async (req, res) => {
  const { name, page = 1, limit = 5 } = req.query;
  const filters = {
    name,
    page: parseInt(page),
    limit: parseInt(limit),
  };
  try {
    const permissions = await permissionService.getAllPermissions(filters);
    res.status(201).send({
      status: "Ok",
      message: "Permisos obtenidos correctamente",
      data: permissions,
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

// CONTROLLER GET PERMISSION BY ID
const getPermissionById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const permission = await permissionService.getPermissionById(id);

    res.status(201).send({
      status: "Ok",
      message: "Permiso obtenidos correctamente",
      data: permission,
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

// CONTROLLER UPDATE PERMISSION BY ID
const updatePermissionById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const data = req.body;

    const permission = await permissionService.updatePermissionById(id, data);

    res.status(201).send({
      status: "Ok",
      message: "Permiso editado correctamente",
      data: {
        permission,
      },
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
        message: "Error inesperado al editadar los permiso",
        message: error.message,
      });
    }
  }
};

// CONTROLLER DELETE PERMISSION BY ID
const deletePermissionById = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    const permission = await permissionService.deletePermissionById(id);

    res.status(201).send({
      status: "Ok",
      message: "Permiso eliminado correctamente",
      data: permission,
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
        message: "Error inesperado al eliminar los permiso",
        message: error.message,
      });
    }
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
};
