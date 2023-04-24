const s = require('superstruct');
const service = require('../services/user');
const { exception } = require('../libs/error');
const { validate } = require('../libs/validate');

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *      - Authentication
 *     description: Login existing user
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *        200:
 *          description: Success operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  data:
 *                    type: object
 *                    properties:
 *                      accessToken:
 *                        type: string
 *        400:
 *          $ref: '#/components/responses/InvalidPayload'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
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

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *      - Authentication
 *     description: Create new user
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *        200:
 *          description: Success operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  data:
 *                    type: object
 *                    properties:
 *                      accessToken:
 *                        type: string
 *        400:
 *          $ref: '#/components/responses/InvalidPayload'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
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
