require("dotenv").config()
const jwt = require("jsonwebtoken")
const passport = require("passport")
const bcrypt = require("bcryptjs")

// Jwt Strategy
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_KEY
const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  const match = await bcrypt.compare(jwt_payload.password, process.env.ADMIN_PASSWORD)
  if (match) {
    return done(null, true)
  }
  return done(null, false)
})

passport.use(jwtStrategy)

exports.auth_login = async (req, res, next) => {
  const { password } = req.body
  if (password) {
    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD)
    if (match) {
      const secret = process.env.SECRET_KEY
      const token = jwt.sign({ password }, secret)
      return res.status(200).json({ message: "Auth succeed", token })
    }
  }
  return res.status(401).json({ error: "Auth failed" })
}

exports.auth_protected = passport.authenticate("jwt", { session: false })

exports.auth_check_auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"]
    if (typeof bearerHeader === "undefined") throw new Error()
    const bearer = bearerHeader.split(" ")
    const token = bearer[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const match = await bcrypt.compare(decoded.password, process.env.ADMIN_PASSWORD)
    if (!match) throw new Error()
    req.isAuth = true
    next()
  } catch (err) {
    req.isAuth = false
    next()
  }
}
