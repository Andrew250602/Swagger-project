const express = require('express')
const router = express.Router()

const UserController = require("../../controllers/private/user/index")


router.get("/get", UserController.getAll)
router.delete("/delete", UserController.deleteAll)
module.exports = router;