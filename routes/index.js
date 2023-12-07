require("dotenv").config()
const express = require("express")
const Router = express.Router()
const jwt = require("jsonwebtoken")

Router.post("/login", (req, res, next) => {
  try {
    const { password } = req.body
    if (password === process.env.ADMIN_PASSWORD) {
      const secret = process.env.SECRET_KEY
      const token = jwt.sign({ password }, secret)
      return res.json({ message: "Auth succeed", token })
    }
    return res.status(401).json({ message: "Auth failed" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = Router
