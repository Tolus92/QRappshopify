const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const containerRoutes = require('C:\\Users\\nnato\\Desktop\\Nowa\\qr-code\\projet-qr\\Projet QRCode\\routes\\containerRoutes');
const productRoutes = require('C:\\Users\\nnato\\Desktop\\Nowa\\qr-code\\projet-qr\\Projet QRCode\\routes\\productRoutes');
const qrCodeRoutes = require('C:\\Users\\nnato\\Desktop\\Nowa\\qr-code\\projet-qr\\Projet QRCode\\routes\\qrCodeRoutes');
const Shopify = require('shopify-api-node');


const shopify = new Shopify({
    shopName: 'nowatest',
    accessToken: 'shpat_'
});
const ngrok = require('ngrok');

const app = express();

// Configuration de bodyParser pour parser les requêtes en JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/containers', containerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/qr-codes', qrCodeRoutes);

// Configuration de la connexion à la base de données
mongoose.connect('mongodb+srv://', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion à la base de données'));
db.once('open', () => {
  console.log('Connecté à la base de données');
});

(async function() {
  const url = await ngrok.connect({
    addr: 3000,
    authtoken: '2NmORmEoaxRaZCbfjYcPMC9dnb7_6hDhwPR3jPqdHuTpwWHra'
  });
  console.log(`Le serveur est démarré sur le port 3000, accessible à l'adresse : ${url}`);
})();

// Configuration des routes
app.use('/api/containers', containerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/qr-codes', qrCodeRoutes);
