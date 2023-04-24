const { decodeToken } = require('../libs/token');
const { User } = require('../models');

const user = async (req, res, next) => {
  const tokenBearer = req.headers.authorization;
  const token = tokenBearer?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token must be provided'
    });
  }

  try {
    const decoded = decodeToken(token);
    req.user = await User.findOne({
      where: {
        id: decoded.user.id
      },
      attributes: {
        exclude: ['password']
      }
    });
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token invalid'
    });
  }
};

module.exports = {
  user
};
