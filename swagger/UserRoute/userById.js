/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Find user by ID
 *     description: Retrieve a user by their ID. Only accessible by admin users.
 *     tags: 
 *       - Find user By Id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "ajkdfjaie324235jjiosf"
 *                 username:
 *                   type: string
 *                   example: admin
 *                 role:
 *                   type: string
 *                   example: admin
 *                 email: 
 *                   type: email
 *                   example: "meme@me.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */