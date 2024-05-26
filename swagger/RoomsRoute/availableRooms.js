/**
 * @swagger
 * tags:
 *   - name: Available Rooms
 *     description: APIs for managing available rooms
 * /api/rooms/available-rooms:
 *   get:
 *     summary: Get available rooms at a particular moment
 *     description: Returns a list of rooms that are currently available
 *     tags:
 *       - Available Rooms
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../../models/Room'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           text/plain:
 *             example: Error finding available rooms
 */