require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Connect to DB
const mongoDB = process.env.MONGODB_URI
const main = async () => mongoose.connect(mongoDB)
main().catch((err) => console.error(err))

const router = express.Router()
const indexRouter = require("./routes/index")
const genreRouter = require("./routes/genre")
const postRouter = require("./routes/post")
const commentRouter = require("./routes/comment")

app.use("/api", router)
router.use("/", indexRouter)
router.use("/genres", genreRouter)
router.use("/posts", postRouter)
router.use("/posts/:postId/comments", commentRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
