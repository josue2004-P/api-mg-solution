/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 *
 * /auth/:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in
 *     description: Authenticates an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "josue@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "josue2025"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: bool
 *                   example: true
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 profiles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["administrador", "cliente"]
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation failed — Input data contains errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 errores:
 *                   type: array
 *                   description: List of validation errors
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Password is required."
 *                       param:
 *                         type: string
 *                         example: "password"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       500:
 *         description: Internal server error — Unexpected error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unexpected error occurred"
 *
 * /auth/new:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create new user
 *     description: Registers a new user in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - username
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Josue"
 *               last_name:
 *                 type: string
 *                 example: "Perez Eulogio"
 *               username:
 *                 type: string
 *                 example: "josue"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "josue@ejemplo.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "josue2025"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   type: object
 *                   description: Returns the newly created user and the generated authentication token
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: Formatted user information
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         username:
 *                           type: string
 *                           example: "josue"
 *                         email:
 *                           type: string
 *                           example: "josue@ejemplo.com"
 *                         first_name:
 *                           type: string
 *                           example: "josue"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*       400:
*         description: Validation failed — Input data contains errors
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errores:
*                   type: array
*                   description: List of validation errors
*                   items:
*                     type: object
*                     properties:   
*                       errores:
*                        type: array
*                        description: List of validation errors
*                        items:
*                          type: object
*                          properties:
*                            msg:
*                              type: string
*                              enum:
*                                - "First name is required."
*                                - "First name must be at least 4 characters."
*                                - "Last name is required."
*                                - "Last name must be at least 4 characters."
*                                - "Username is required."
*                                - "Username must be at least 4 characters."
*                                - "Email is required."
*                                - "Email is invalid."
*                                - "Password is required."
*                                - "Password must be at least 8 characters."
*                              example: "First name is required."
*                            param:
*                              type: string
*                              enum:
*                                - first_name
*                                - last_name
*                                - username
*                                - email
*                                - password
*                              example: first_name
*                            location:
*                              type: string
*                              example: body
*
*       500:
*         description: Internal server error — Unexpected error when creating the user
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: boolean
*                   example: false
*                 message:
*                   type: string
*                   example: "Unexpected error while creating the user"
*                 error:
*                   type: string
*                   example: "Database connection failed"

 *
 * /auth/renew:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Revalidate token
 *     description: Obtains a new authentication token
 *     security:
 *       - XTokenAuth: []
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: bool
 *                   example: true
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 profiles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["administrador", "cliente"]
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: No token provided in the request
 */
