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
  eventHistory: [{ type: new Schema({ event: { type: String }, interactionId: { type: Schema.Types.ObjectId, ref: 'Auction' } }, { timestamps: true }) }],
  trackingAuctions: [{ type: Schema.Types.ObjectId, ref: 'Auction', default: [] }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)