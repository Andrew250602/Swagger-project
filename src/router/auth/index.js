const express = require('express')
const router = express.Router()

const UserController = require("../../controllers/auth/index")

router.post("/create", UserController.createUser)
router.post("/signIn", UserController.signInUser)

module.exports = router;