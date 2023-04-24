/**
 * @openapi
 * /me:
 *   get:
 *     security:
 *     - Authorization: []
 *     tags:
 *      - User
 *     description: Get user login
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
 *                    $ref: '#/components/schemas/User'
 *        400:
 *          $ref: '#/components/responses/InvalidPayload'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 */
const index = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.user
  });
};

module.exports = {
  index
};
