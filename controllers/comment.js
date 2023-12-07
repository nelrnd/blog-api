const Comment = require("../models/comment")
const { body, validationResult } = require("express-validator")

exports.comment_list = async (req, res, next) => {
  try {
    const { postId } = req.params
    const postComments = await Comment.find({ post: postId }).sort("timestamp").exec()
    res.json(postComments)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.comment_create = [
  // Convert body string into array of paragraph
  (req, res, next) => {
    if (typeof req.body.body === "string") {
      const arr = req.body.body.replaceAll("\r\n", "\n").replaceAll("\n\n", "\n").split("\n")
      req.body.body = arr
    }
    next()
  },
  body("from")
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Name must be between 3 and 30 characters long.")
    .escape(),
  body("body.*").escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { postId } = req.params
      const { from, body } = req.body
      const comment = new Comment({ from, body, post: postId })
      await comment.save()
      res.json(comment)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
]

exports.comment_detail = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.findById(commentId).exec()
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" })
    }
    res.json(comment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.comment_delete = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const deletedComment = await Comment.findByIdAndDelete(commentId).exec()
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" })
    }
    res.json({ message: "Comment deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
