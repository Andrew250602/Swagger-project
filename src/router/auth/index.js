const express = require('express')
const router = express.Router()

const UserController = require("../../controllers/auth/index")

/**
 * @swagger
 * /api/auth/create:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               passWord:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/create", UserController.createUser);
/**
 * @swagger
 * /api/auth/signIn:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               passWord:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/signIn", UserController.signInUser);

module.exports = router;