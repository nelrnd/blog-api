const mongoose = require("mongoose")
const Schema = mongoose.Schema

const genreSchema = new Schema({
  name: { type: String, required: true, length: { min: 3, max: 100 } },
})

module.exports = mongoose.Schema("Genre", genreSchema)
