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
router.post("/create", UserController.createOrUpdate);
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

router.post("/signIn", UserController.signIn);
/**
 * @swagger
 * /api/auth/signOut:
 *   post:
 *     summary: Đăng xuất người dùng
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
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/signOut", UserController.signOut);
/**
 * @swagger
 * /api/auth/delete:
 *   post:
 *     summary: Xóa người dùng
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *             required:
 *               - code
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input
 */
router.post("/delete", UserController.delete);
router.post("/startRefreshToken", UserController.checkAccessToken);
router.post("/endRefreshToken", UserController.checkRefreshToken);
module.exports = router;