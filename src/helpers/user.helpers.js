// helpers/user.helpers.js

function mapRequestToUser(body) {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
  } = body;

  return { first_name, last_name, username, email, password };
}

function formatUser(user) {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    is_active: user.is_active,
    created_at: user.created_at,
  };
}

// OBTENER NOMBRES COMPLETOS
function addFullName(users) {
  return users.map((user) => ({
    ...user,
    fullName: getFullName(user),
  }));
}

function getFullName(user) {
  return `${user.first_name} ${user.last_name} `;
}

module.exports = {
  mapRequestToUser,
  formatUser,
  addFullName
};