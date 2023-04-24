const bcrypt = require('bcryptjs');

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const verifyPassword = (password, encryptedPassword) => {
  return bcrypt.compareSync(password, encryptedPassword);
};

module.exports = {
  encryptPassword,
  verifyPassword
};
