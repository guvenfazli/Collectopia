const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  interests: [{ type: String }],
  items: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
  auctions: [{ type: Schema.Types.ObjectId, ref: 'Auction', }],
  inbox: [{ type: Schema.Types.ObjectId, ref: 'PrivateMessage' }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  receivedOffers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
  sentOffers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
  eventHistory: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  trackingAuctions: [{ type: Schema.Types.ObjectId, ref: 'Auction', default: [] }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)