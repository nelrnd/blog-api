const Post = require("../models/post")
const { body, validationResult } = require("express-validator")

exports.post_list = async (req, res, next) => {
  try {
    console.log(req.isAuth)
    let allPosts
    if (req.isAuth) {
      allPosts = await Post.find().sort("timestamp").exec()
    } else {
      allPosts = await Post.find({ published: true }).sort("timestamp").exec()
    }
    res.json(allPosts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.post_create = [
  // Convert body string into array of paragraph
  (req, res, next) => {
    if (typeof req.body.body === "string") {
      const arr = req.body.body.replaceAll("\r\n", "\n").replaceAll("\n\n", "\n").split("\n")
      req.body.body = arr
    }
    next()
  },
  // Convert published value to boolean
  (req, res, next) => {
    if (req.body.published) {
      req.body.published = true
    } else {
      req.body.published = false
    }
    next()
  },
  // Convert genre to array
  (req, res, next) => {
    if (!req.body.genres) {
      req.body.genres = []
    }
    next()
  },
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters long.")
    .escape(),
  body("body.*").escape(),
  body("genre.*").escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { title, body, genres, published } = req.body
      const post = new Post({ title, body, genres, published })
      await post.save()
      res.json(post)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
]

exports.post_detail = async (req, res, next) => {
  try {
    const { postId } = req.params
    const post = await Post.findById(postId).exec()
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }
    if (req.isAuth === false && post.published === false) {
      return res.status(401).json({ error: "Not authorized" })
    }
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.post_update = [
  // Convert body string into array of paragraph
  (req, res, next) => {
    if (typeof req.body.body === "string") {
      const arr = req.body.body.replaceAll("\r\n", "\n").replaceAll("\n\n", "\n").split("\n")
      req.body.body = arr
    }
    next()
  },
  // Convert published value to boolean
  (req, res, next) => {
    if (req.body.published) {
      req.body.published = true
    } else {
      req.body.published = false
    }
    next()
  },
  // Convert genre to array
  (req, res, next) => {
    if (!req.body.genres) {
      req.body.genres = []
    }
    next()
  },
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters long.")
    .escape(),
  body("body.*").escape(),
  body("genre.*").escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { postId } = req.params
      const { title, body, genres, published } = req.body
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          body,
          genres,
          published,
          update_timestamp: Date.now(),
        },
        { new: true }
      ).exec()
      res.json(updatedPost)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
]

exports.post_delete = async (req, res, next) => {
  try {
    const { postId } = req.params
    const deletedPost = await Post.findByIdAndDelete(postId).exec()
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" })
    }
    res.json({ message: "Post deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
