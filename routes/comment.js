const express = require("express")
const Router = express.Router({ mergeParams: true })
const commentController = require("../controllers/comment")

Router.get("/", commentController.comment_list)

Router.post("/", commentController.comment_create)

Router.get("/:commentId", commentController.comment_detail)

Router.delete("/:commentId", commentController.comment_delete)

module.exports = Router
