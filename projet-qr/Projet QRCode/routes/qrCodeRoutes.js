const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// POST route to generate and save a new QR code
router.post('/', qrCodeController.generateQRCode);

// GET route to retrieve QR code by container ID
router.get('/:id', qrCodeController.getQRCodeByContainerID);

module.exports = router;