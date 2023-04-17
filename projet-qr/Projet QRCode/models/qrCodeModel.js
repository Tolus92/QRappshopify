const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  container: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Container'
  }
});

const QRCode = mongoose.model('QRCode', qrCodeSchema);

module.exports = QRCode;