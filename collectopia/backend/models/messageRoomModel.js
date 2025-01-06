const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageRoomSchema = new Schema({
  auctionRoom: { type: Schema.Types.ObjectId, ref: 'Auction' },
  messages: [{ message: { type: String }, sender: { type: Schema.Types.ObjectId, ref: 'User' } }]
}, { timestamps: true })

module.exports = mongoose.model('MessageRoom', messageRoomSchema)