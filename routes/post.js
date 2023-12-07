const express = require("express")
const Router = express.Router()
const postController = require("../controllers/post")
const authController = require("../controllers/auth")

Router.get("/", postController.post_list)

Router.post("/", authController.auth_protected, postController.post_create)

Router.get("/:postId", postController.post_detail)

Router.put("/:postId", authController.auth_protected, postController.post_update)

Router.delete("/:postId", authController.auth_protected, postController.post_delete)

module.exports = Router
