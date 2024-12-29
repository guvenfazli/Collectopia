const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bidSchema = new Schema({
  bidValue: { type: Number },
  bidder: { type: Schema.Types.ObjectId, ref: 'User' },
  biddedTo: { type: Schema.Types.ObjectId, ref: 'Item' },
}, { timestamps: true })

module.exports = mongoose.model('Bid', bidSchema)