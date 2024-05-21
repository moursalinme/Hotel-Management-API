/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Only accessible by users with the admin role.
 *     tags: 
 *       - Get All Users.
 *     security:
 *       - JWT from Cookies: []
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: String
 *                     example: adjka34nhdf83434
 *                   username:
 *                     type: string
 *                     example: admin
 *                   role:
 *                     type: string
 *                     example: admin
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: admin@example.com
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
