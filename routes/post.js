const express = require("express")
const Router = express.Router()
const Post = require("../models/post")

Router.get("/", async (req, res, next) => {
  const allPosts = await Post.find().sort("timestamp").exec()
  res.json(allPosts)
})

Router.post("/", async (req, res, next) => {
  const { title, body, genres, published } = req.body
  const post = new Post({ title, body, genres, published })
  await post.save()
  res.json(post)
})

Router.get("/:postId", async (req, res, next) => {
  const { postId } = req.params
  const post = await Post.findById(postId).exec()
  res.json(post)
})

Router.put("/:postId", async (req, res, next) => {
  const { postId } = req.params
  const { title, body, genres, published } = req.body
  const updatedPost = await Post.findByIdAndUpdate(postId, {
    title,
    body,
    genres,
    published,
    update_timestamp: Date.now(),
  })
  res.json(updatedPost)
})

Router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params
  await Post.findByIdAndDelete(postId)
  res.json({ message: "Post deleted" })
})

module.exports = Router
