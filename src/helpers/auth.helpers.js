// helpers/usuarioHelper.js

function mapRequestToUsuario(body) {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
  } = body;

  return { first_name, last_name, username, email, password };
}

function formatUsuario(user) {
  return {
    id: user.id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    is_active: user.is_active,
    created_at: user.created_at,
  };
}

module.exports = {
  mapRequestToUsuario,
  formatUsuario,
};