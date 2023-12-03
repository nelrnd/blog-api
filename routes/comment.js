const express = require("express")
const Router = express.Router()
const Comment = require("../models/comment")

Router.get("/", async (req, res, next) => {
  const { postId } = req.params
  const postComments = await Comment.find({ post: postId }).sort("timestamp").exec()
  res.json(postComments)
})

Router.post("/", async (req, res, next) => {
  const { postId } = req.params
  const { name, body } = req.body
  const comment = new Comment({ name, body, post: postId })
  await comment.save()
  res.json(comment)
})

Router.get("/:commentId", async (req, res, next) => {
  const { commentId } = req.params
  const comment = await Comment.findById(commentId).exec()
  res.json(comment)
})

Router.delete("/:commentId", async (req, res, next) => {
  const { commentId } = req.params
  await Comment.findByIdAndDelete(commentId)
  res.json({ message: "Comment deleted" })
})

module.exports = Router
