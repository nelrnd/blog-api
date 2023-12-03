const express = require("express")
const Router = express.Router()
const Genre = require("../models/genre")
const Post = require("../models/post")

Router.get("/", async (req, res, next) => {
  const allGenres = await Genre.find().sort("name").exec()
  res.json(allGenres)
})

Router.post("/", async (req, res, next) => {
  const { name } = req.body
  const genre = new Genre({ name })
  await genre.save()
  res.json(genre)
})

Router.get("/:genreId", async (req, res, next) => {
  const { genreId } = req.params
  const [genre, genre_posts] = await Promise.all([
    Genre.findById(genreId).exec(),
    Post.find({ genre: genreId }).exec(),
  ])
  res.json({ genre, genre_posts })
})

Router.put("/:genreId", async (req, res, next) => {
  const { genreId } = req.params
  const { name } = req.body
  const updatedGenre = await Genre.findByIdAndUpdate(genreId, { name })
  res.json(updatedGenre)
})

Router.delete("/:genreId", async (req, res, next) => {
  const { genreId } = req.params
  await Genre.findByIdAndDelete(genreId)
  res.json({ message: "Genre deleted" })
})

module.exports = Router
