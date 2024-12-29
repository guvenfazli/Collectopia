const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  bidList: {},
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

module.exports = mongoose.model('Auction', auctionSchema)