const s = require('superstruct');
const service = require('../services/user');
const { exception } = require('../libs/error');
const { validate } = require('../libs/validate');

const login = async (req, res, next) => {
  const schema = {
    email: s.nonempty(s.string()),
    password: s.nonempty(s.string())
  };

  const errors = validate(req.body, schema);
  if (errors) {
    return res.status(400).json({
      success: false,
      message: errors
    });
  }

  try {
    const data = await service.authentication(req.body);
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

const register = async (req, res, next) => {
  const schema = {
    name: s.nonempty(s.string()),
    email: s.nonempty(s.string()),
    password: s.nonempty(s.string())
  };

  const errors = validate(req.body, schema);
  if (errors) {
    return res.status(400).json({
      success: false,
      message: errors
    });
  }

  try {
    const data = await service.store(req.body);
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

module.exports = {
  login,
  register
};
