const mongoose = require('mongoose')
const Schema = mongoose.Schema

const privateMessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('PrivateMessage', privateMessageSchema)