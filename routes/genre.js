const express = require("express")
const Router = express.Router()
const genreController = require("../controllers/genre")

Router.get("/", genreController.genre_list)

Router.post("/", genreController.genre_create)

Router.get("/:genreId", genreController.genre_detail)

Router.put("/:genreId", genreController.genre_update)

Router.delete("/:genreId", genreController.genre_delete)

module.exports = Router
