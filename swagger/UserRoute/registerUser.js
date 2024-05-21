/**
 *  @swagger
 *  /api/users/register:
 *  post:
 *      summary: Register a new user
 *      description: This endpoint allows you to register a new user by providing the required information.
 *      tags: 
 *          - Register User
 *      requestBody:
 *          description: The user to create
 *          required: true
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: Object
 *                      properties: 
 *                          username: 
 *                              type: string
 *                              example: moursalinme
 *                          email: 
 *                              type: string
 *                              example: memon@gmail.com
 *                              format: email
 *                          phone: 
 *                              type: string
 *                              example: 012345678910
 *                          password: 
 *                              type: string
 *                              example: 012345678910
 *                      required:
 *                          - username
 *                          - email
 *                          - phone
 *                          - password  
*      responses: 
*          '201': 
*               description: User Created
*               content: 
*                   application/json:
*                       schema: 
*                           type: Object
*                           properties: 
*                               username: 
*                                   type: string
*                                   example: moursalinme
*                               email: 
*                                   type: string
*                                   example: memon@gmail.com
*                                   format: email
*                               phone: 
*                                   type: string
*                                   example: 012345678910
*             
*          '400': 
*              description: Bad Request    
*/