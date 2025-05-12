const express = require('express')
const router = express.Router()

const UserController = require("../../controllers/auth/index")

router.post("/createUser", UserController.createUser)

module.exports = router;