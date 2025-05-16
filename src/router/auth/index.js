const express = require('express')
const router = express.Router()

const AuthorController = require("../../controllers/auth/index")

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
router.post("/create", AuthorController.createOrUpdate);
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

router.post("/signIn", AuthorController.signIn);
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
router.post("/signOut", AuthorController.signOut);
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
router.post("/delete", AuthorController.delete);
router.post("/startRefreshToken", AuthorController.checkAccessToken);
router.post("/endRefreshToken", AuthorController.checkRefreshToken);
module.exports = router;