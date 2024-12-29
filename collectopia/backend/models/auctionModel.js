const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  bidList: [{ type: Schema.Types.ObjectId, ref: 'Bid', default: [] }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  minValue: {
    type: Number,
    required: true
  },
  buyout: {
    type: Number,
    required: true
  },
  deadline: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model('Auction', auctionSchema)