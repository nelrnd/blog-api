const express = require("express")
const Router = express.Router()
const Post = require("../models/post")

Router.get("/", async (req, res, next) => {
  try {
    const allPosts = await Post.find().sort("timestamp").exec()
    res.json(allPosts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.post("/", async (req, res, next) => {
  try {
    const { title, body, genres, published } = req.body
    const post = new Post({ title, body, genres, published })
    await post.save()
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.get("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params
    const post = await Post.findById(postId).exec()
    if (!post) return res.status(404).json({ error: "Post not found" })
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.put("/:postId", async (req, res, next) => {
  try {
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
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.delete("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params
    await Post.findByIdAndDelete(postId)
    res.json({ message: "Post deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = Router
