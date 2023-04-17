const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  containers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Container'
  }]
});

module.exports = mongoose.model('Product', productSchema);