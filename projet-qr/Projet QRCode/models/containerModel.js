const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
  qrCode: {
    type: String,
    unique: true,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: ['xs', 's', 'm', 'l'],
  },
  price: {
    type: Number,
    required: true,
    default: 1,
  },
  linkedProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;