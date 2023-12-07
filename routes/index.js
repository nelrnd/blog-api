const express = require("express")
const Router = express.Router()
const authController = require("../controllers/auth")

Router.post("/login", authController.auth_login)

Router.get("/protected", authController.auth_protected, (req, res) => {
  res.json({ message: "Yay! Finally got there!" })
})

module.exports = Router
