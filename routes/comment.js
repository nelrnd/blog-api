const express = require("express")
const Router = express.Router({ mergeParams: true })
const commentController = require("../controllers/comment")
const authController = require("../controllers/auth")

Router.get("/", commentController.comment_list)

Router.post("/", commentController.comment_create)

Router.get("/:commentId", commentController.comment_detail)

Router.delete("/:commentId", authController.auth_protected, commentController.comment_delete)

module.exports = Router
