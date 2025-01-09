const mongoose = require('mongoose')
const Schema = mongoose.Schema

const offerSchema = new Schema({
  offerer: { type: Schema.Types.ObjectId, ref: 'User', },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', },
  offer: {
    offeredItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    wantedItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
  }
}, { timestamps: true })

module.exports = mongoose.model('Offer', offerSchema)