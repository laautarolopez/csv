const { Router } = require("express")
const { getUsers, uploadUsers } = require("../controllers/users.controller.js")

const router = Router()

/** GET Methods */
/**
 * @openapi
 * /users:
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get all users
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      500:
 *        description: Server Error
 */
router.get('/users', getUsers)

/** POST Methods */
/**
 * @openapi
 * '/users/upload':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Upload a file with users
 *     parameters:
 *      - name: users
 *        in: formData
 *        type: file
 *        description: The CSV file to upload.
 *        required: true
 *     responses:
 *      200:
 *        description: Data loaded successfully
 *      400:
 *        description: Error with CSV file
 *      500:
 *        description: Server Error
 */
router.post('/users/upload', uploadUsers)

module.exports = router