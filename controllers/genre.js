const Genre = require("../models/genre")
const Post = require("../models/post")
const { body, validationResult } = require("express-validator")

exports.genre_list = async (req, res, next) => {
  try {
    const allGenres = await Genre.find().sort("name").exec()
    res.json(allGenres)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.genre_create = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters longs.")
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { name } = req.body
      const genre = new Genre({ name })
      await genre.save()
      res.json(genre)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
]

exports.genre_detail = async (req, res, next) => {
  try {
    const { genreId } = req.params
    const [genre, genre_posts] = await Promise.all([
      Genre.findById(genreId).exec(),
      Post.find({ genre: genreId }).exec(),
    ])
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" })
    }
    res.json({ genre, genre_posts })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.genre_update = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters longs.")
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { genreId } = req.params
      const { name } = req.body
      const updatedGenre = await Genre.findByIdAndUpdate(genreId, { name }, { new: true }).exec()
      res.json(updatedGenre)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
]

exports.genre_delete = async (req, res, next) => {
  try {
    const { genreId } = req.params
    const deletedGenre = await Genre.findByIdAndDelete(genreId).exec()
    if (!deletedGenre) {
      return res.status(404).json({ error: "Genre not found" })
    }
    res.json({ message: "Genre deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
