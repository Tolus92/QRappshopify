const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://TolusNowa:Nowamarket123456789@clustertest.nzjt155.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.log(err));

module.exports = mongoose.connection;