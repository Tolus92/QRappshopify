const qrCode = require('../models/qrCodeModel');
const QRCode = require('../models/qrCodeModel');
const Product = require('../models/productModel');
const Container = require('../models/containerModel');

// Générer un code QR pour un produit
exports.generateQRCode = (req, res) => {
  const containerID = req.body.containerID;
  const qrCode = qr.image(containerID, { type: 'png' });
  res.setHeader('Content-type', 'image/png');
  qrCode.pipe(res, (err) => {
    if (err) {
      res.status(500).send('An error occurred while generating the QR code');
    }
  });
};

// Générer un code QR pour un contenant
exports.generateContainerQRCode = async (req, res) => {
  try {
    const container = await Container.findById(req.params.containerId);
    if (!container) {
      return res.status(404).json({ message: 'Container not found' });
    }
    const containerQRCode = await qrCode.toDataURL(`container_${container._id}`);
    return res.status(200).json({ qrCode: containerQRCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Associer le code QR du contenant avec un produit vendu
exports.linkContainerToProduct = async (req, res) => {
  try {
    const container = await Container.findOne({ qrCode: req.body.containerQRCode });
    if (!container) {
      return res.status(404).json({ message: 'Container not found' });
    }
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.container = container._id;
    await product.save();
    res.status(200).json({ message: 'Container linked to product successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getQRCodeByContainerID = async (req, res) => {
  try {
    const container = await Container.findById(req.params.id);
    if (!container) {
      return res.status(404).json({ message: 'Container not found' });
    }
    const qrCode = qr.image(`container_${container._id}`, { type: 'png' });
    res.setHeader('Content-type', 'image/png');
    qrCode.pipe(res, (err) => {
      if (err) {
        res.status(500).send('An error occurred while generating the QR code');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};