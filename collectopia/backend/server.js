const express = require('express')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const cookieparser = require('cookie-parser')
const multer = require('multer')

// MODELS
const User = require('./models/userModel')

// ENV FILES
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

// ROUTES
const authRouter = require('./routes/authRoute')


// SESSION STORING

const store = new MongoDBStore({
  uri: `${process.env.DB_CONNECTION}`,
  collection: 'sessions',
})


// MIDDLEWARES
const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
app.use(cookieparser())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('imageList', 3))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
}))
app.use(session({ secret: `${process.env.SESSION_PW}`, resave: false, saveUninitialized: false, store: store }))
app.use(bodyParser.json()) // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next();
})







app.use('/auth', authRouter)


app.use((error, req, res, next) => {
  const message = error.message
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({ message })
})

mongoose.connect(`${process.env.DB_CONNECTION}`).then(result => {
  server.listen(8080)
}).catch(err => console.log(err))