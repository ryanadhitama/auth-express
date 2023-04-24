const jwt = require('jsonwebtoken');

const { JWT_SIGNATURE_KEY } = require('../../config/application');

const createToken = (user) => {
  user.password = undefined;
  return jwt.sign(
    {
      user
    },
    JWT_SIGNATURE_KEY
  );
};

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SIGNATURE_KEY);
};

module.exports = {
  createToken,
  decodeToken
};
