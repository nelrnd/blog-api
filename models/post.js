const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, requried: true, length: { min: 3, max: 100 } },
  body: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
  update_timestamp: Date,
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  published: { type: Boolean, required: true },
})

module.exports = mongoose.model("Post", postSchema)
