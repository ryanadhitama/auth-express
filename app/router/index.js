const swaggerUi = require('swagger-ui-express');
const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');
const { user } = require('../middleware/user');

const swaggerSpec = require('./docs');

function apply(app) {
  app.post('/v1/login', AuthController.login);
  app.post('/v1/register', AuthController.register);
  app.get('/v1/me', user, UserController.index);
  app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return app;
}

module.exports = { apply };
