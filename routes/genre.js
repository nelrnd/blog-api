const express = require("express")
const Router = express.Router()
const genreController = require("../controllers/genre")
const authController = require("../controllers/auth")

Router.get("/", genreController.genre_list)

Router.post("/", authController.auth_protected, genreController.genre_create)

Router.get("/:genreId", genreController.genre_detail)

Router.put("/:genreId", authController.auth_protected, genreController.genre_update)

Router.delete("/:genreId", authController.auth_protected, genreController.genre_delete)

module.exports = Router
