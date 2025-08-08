// helpers/usuarioHelper.js

function mapRequestToUsuario(body) {
  const {
    nombre,
    apellido,
    nombre_usuario,
    correo_electronico,
    contrasena_hash,
  } = body;

  return { nombre, apellido, nombre_usuario, correo_electronico, contrasena_hash };
}

function formatUsuario(user) {
  return {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    nombre_usuario: user.nombre_usuario,
    correo_electronico: user.correo_electronico,
    esta_activo: user.esta_activo,
    creado_en: user.creado_en,
  };
}

module.exports = {
  mapRequestToUsuario,
  formatUsuario,
};