const express = require("express")
const Router = express.Router()
const postController = require("../controllers/post")

Router.get("/", postController.post_list)

Router.post("/", postController.post_create)

Router.get("/:postId", postController.post_detail)

Router.put("/:postId", postController.post_update)

Router.delete("/:postId", postController.post_delete)

module.exports = Router
