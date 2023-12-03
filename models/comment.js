const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
  from: { type: String, required: true, length: { min: 3, max: 30 } },
  body: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Comment", commentSchema)
