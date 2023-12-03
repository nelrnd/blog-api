const express = require("express")
const Router = express.Router()
const Genre = require("../models/genre")
const Post = require("../models/post")

Router.get("/", async (req, res, next) => {
  try {
    const allGenres = await Genre.find().sort("name").exec()
    res.json(allGenres)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body
    const genre = new Genre({ name })
    await genre.save()
    res.json(genre)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.get("/:genreId", async (req, res, next) => {
  try {
    const { genreId } = req.params
    const [genre, genre_posts] = await Promise.all([
      Genre.findById(genreId).exec(),
      Post.find({ genre: genreId }).exec(),
    ])
    res.json({ genre, genre_posts })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.put("/:genreId", async (req, res, next) => {
  try {
    const { genreId } = req.params
    const { name } = req.body
    const updatedGenre = await Genre.findByIdAndUpdate(genreId, { name })
    res.json(updatedGenre)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

Router.delete("/:genreId", async (req, res, next) => {
  try {
    const { genreId } = req.params
    await Genre.findByIdAndDelete(genreId)
    res.json({ message: "Genre deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = Router
