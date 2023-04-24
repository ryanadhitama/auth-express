const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');
const { user } = require('../middleware/user');

function apply(app) {
  app.post('/v1/login', AuthController.login);
  app.post('/v1/register', AuthController.register);
  app.get('/v1/me', user, UserController.index);

  return app;
}

module.exports = { apply };
