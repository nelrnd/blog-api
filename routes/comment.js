const express = require("express")
const Router = express.Router({ mergeParams: true })
const Comment = require("../models/comment")

Router.get("/", async (req, res, next) => {
  try {
    const { postId } = req.params
    const postComments = await Comment.find({ post: postId }).sort("timestamp").exec()
    res.json(postComments)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.post("/", async (req, res, next) => {
  try {
    const { postId } = req.params
    const { name, body } = req.body
    const comment = new Comment({ name, body, post: postId })
    await comment.save()
    res.json(comment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.get("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.findById(commentId).exec()
    res.json(comment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.delete("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params
    await Comment.findByIdAndDelete(commentId)
    res.json({ message: "Comment deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = Router
