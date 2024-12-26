const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  minValue: {
    type: Number,
    required: true
  },
  buyout: {
    type: Number,
    required: true
  },
  lastDate: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)