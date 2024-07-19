const { Router } = require("express")
const { validateSchema } = require("../middlewares/validator.middleware.js")
const { transferCredits, getReport } = require("../controllers/credits.controller.js")
const { transferCreditsSchema, getReportSchema } = require("../schemas/credits.schema.js")

const router = Router()

/** POST Methods */
/**
 * @openapi
 * '/credits/transfer':
 *  post:
 *     tags:
 *     - Credits Controller
 *     summary: Transfer credits from one user to another
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - from_id
 *              - to_id
 *              - amount
 *            properties:
 *              from_id:
 *                type: string
 *                default: '1'
 *              to_id:
 *                type: string
 *                default: '2'
 *              amount:
 *                type: number
 *                default: 10
 *     responses:
 *      200:
 *        description: Successful transfer
 *      400:
 *        description: Error with transfer
 *      500:
 *        description: Server Error
 */
router.post('/credits/transfer', validateSchema(transferCreditsSchema), transferCredits)

/** GET Methods */
/**
 * @openapi
 * '/credits/report':
 *  get:
 *     tags:
 *     - Credits Controller
 *     summary: Get a report indicating how many credits have been exchanged in total in a specific time period.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - initial_date
 *              - end_date
 *            properties:
 *              initial_date:
 *                type: string
 *                format: date
 *                default: '2024-01-01'
 *                description: The start date of the period.
 *              end_date:
 *                type: date
 *                format: date
 *                default: '2024-01-31'
 *                description: The end date of the period.
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                credits:
 *                  type: number
 *      500:
 *        description: Server Error
 */
router.get('/credits/report', validateSchema(getReportSchema), getReport)

module.exports = router