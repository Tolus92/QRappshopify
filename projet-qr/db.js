const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.log(err));

module.exports = mongoose.connection;
