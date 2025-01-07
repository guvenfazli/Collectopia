const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionBidSchema = new Schema({
  auctionId: { type: Schema.Types.ObjectId, ref: 'Auction' },
  bidList: [{ type: Schema.Types.ObjectId, ref: 'Bid', default: [] }]
}, { timestamps: true })

module.exports = mongoose.model('AuctionBid', auctionBidSchema)