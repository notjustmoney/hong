const roles = ['user', 'productor', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['manageProfile', 'createComment', 'manageComment']);
roleRights.set(roles[1], ['manageProfile', 'createComment', 'manageComment', 'createPost', 'managePost']);
roleRights.set(roles[2], [
  'manageProfile',
  'createComment',
  'manageComment',
  'createPost',
  'managePost',
  'getUsers',
  'manageUsers',
]);

module.exports = {
  roles,
  roleRights,
};
