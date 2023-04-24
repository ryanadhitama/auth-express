const UserController = require('../controllers/user');

function apply(app) {
  app.get('/v1/me', UserController.index);

  return app;
}

module.exports = { apply };
