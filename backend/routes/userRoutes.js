const express = require("express")
const router = express.Router()
const protect = require("../middlewares/AuthMiddleware")
const { registerUser, loginUser, addFriend } = require("../controllers/userControllers")


router.post("/", registerUser)
router.post("/login", loginUser)
router.post("/add-friend", protect, addFriend)

module.exports = router