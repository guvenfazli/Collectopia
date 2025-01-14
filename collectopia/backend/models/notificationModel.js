const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  followedUserId: [{ type: Schema.Types.ObjectId, ref: 'User', }],
  followedAuctionId: [{ type: Schema.Types.ObjectId, ref: 'Auction', }],
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema)