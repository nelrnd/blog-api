const express = require("express")
const Router = express.Router()
const authController = require("../controllers/auth")

Router.post("/login", authController.auth_login)

module.exports = Router
