const roles = ['user', 'productor', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['createComment', 'manageComment']);
roleRights.set(roles[1], ['createComment', 'manageComment', 'createPost', 'managePost']);
roleRights.set(roles[2], ['createComment', 'manageComment', 'createPost', 'managePost', 'getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
