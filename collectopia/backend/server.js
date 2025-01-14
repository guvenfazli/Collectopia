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
const path = require('path')


// MODELS
const User = require('./models/userModel')
const Item = require('./models/itemModel')
const Bid = require('./models/bidModel')
const Auction = require('./models/auctionModel')
const MessageRoom = require('./models/messageRoomModel')
const AuctionBid = require('./models/auctionBidModel')
const PrivateMessage = require('./models/privateMessageModel')
const Offer = require('./models/offerModel')
const Event = require('./models/eventModel')

// ENV FILES
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

// ROUTES
const authRouter = require('./routes/authRoute')
const mainRouter = require('./routes/mainRoute')


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
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  /* methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"], */
}))
app.use(session({ secret: `${process.env.SESSION_PW}`, resave: false, saveUninitialized: false, store: store }))
app.use(bodyParser.json()) // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next();
})



app.use('/auth', authRouter)
app.use('/', mainRouter)

app.use((error, req, res, next) => {
  const message = error.message
  const statusCode = error.statusCode || 500
  const field = error.field && error.field
  res.status(statusCode).json({ message, field })
})

mongoose.connect(`${process.env.DB_CONNECTION}`).then(result => {
  server.listen(8080)
}).catch(err => console.log(err))

const io = require('./io').init(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  }
})

io.use((socket, next) => {
  next()
})

const addItemPage = io.of('/addItem')
const profilePage = io.of('/profilePage')
const auctionRoom = io.of('/auctionRoom')

addItemPage.on('connection', (connectedUser) => {
  connectedUser.on('itemAdded', (user) => {
    addItemPage.emit('itemAddedNotification', (user))
  })
})

profilePage.on('connection', (connectedUser) => {

  let joinedProfileId;

  connectedUser.on("joinUserProfileRoom", (userId) => {
    connectedUser.join(userId)
    joinedProfileId = userId
  })

  connectedUser.on("profileUpdateTrigger", (user) => {
    profilePage.to(joinedProfileId).emit("profileUpdate", (user))
  })

})

auctionRoom.on('connection', (connectedUser) => {

  let joinedAuctionId;

  connectedUser.on("joinToAuctionRoom", (auctionId) => {
    connectedUser.join(auctionId)
    joinedAuctionId = auctionId
  })

  connectedUser.on("sendMessage", (user) => {
    auctionRoom.to(joinedAuctionId).emit("updateMessages")
  })

  connectedUser.on('leaveRoom', (auctionInformation) => {
    const { auctionId } = auctionInformation
    connectedUser.leave(auctionId)
  })

})