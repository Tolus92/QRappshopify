//Ces fonctions permettent de récupérer tous les conteneurs, de récupérer un conteneur spécifique par ID, de créer un nouveau conteneur, de mettre à jour un conteneur existant et de supprimer un conteneur existant. 
//Les propriétés d'un conteneur peuvent être ajustées selon les besoins.

const Container = require('../models/containerModel');

exports.getAllContainers = async (req, res) => {
  try {
    const containers = await Container.find();
    res.json(containers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getContainerById = async (req, res) => {
  try {
    const container = await Container.findById(req.params.id);
    if (!container) {
      return res.status(404).json({ message: "Container not found" });
    }
    
    container.size = req.body.size || container.size;
    container.price = req.body.price || container.price;
    // Mettre à jour d'autres propriétés si nécessaire
    
    const updatedContainer = await container.save();
    
    res.json(updatedContainer);
    res.json(container);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createContainer = async (req, res) => {
  const container = new Container({
    size: req.body.size,
    price: req.body.price,
    // Ajouter d'autres propriétés si nécessaire
  });

  try {
    const newContainer = await container.save();
    res.status(201).json(newContainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateContainer = async (req, res) => {
  try {
    const container = await Container.findById(req.params.id);
    if (container) {
      container.size = req.body.size || container.size;
      container.price = req.body.price || container.price;
      // Mettre à jour d'autres propriétés si nécessaire
      const updatedContainer = await container.save();
      res.json(updatedContainer);
    } else {
      res.status(404).json({ message: 'Container not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteContainer = async (req, res) => {
  try {
    const container = await Container.findById(req.params.id);
    if (container) {
      await container.remove();
      res.json({ message: 'Container deleted' });
    } else {
      res.status(404).json({ message: 'Container not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};