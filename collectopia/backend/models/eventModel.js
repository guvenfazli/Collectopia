const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  event: { type: String },
  interactionId: { type: Schema.Types.ObjectId, ref: 'Auction' }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)