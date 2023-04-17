const express = require('express');
const router = express.Router();
const containerController = require('../controllers/containerController');

// Créer un nouveau contenant
router.post('/', containerController.createContainer);

// Récupérer tous les contenants
router.get('/', containerController.getAllContainers);

// Récupérer un contenant par ID
router.get('/:id', containerController.getContainerById);

// Mettre à jour un contenant
router.put('/:id', containerController.updateContainer);

// Supprimer un contenant
router.delete('/:id', containerController.deleteContainer);

module.exports = router;