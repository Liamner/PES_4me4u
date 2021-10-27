const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    products: {
        //atencion falta linkear con productos
        type: ['String'],
        required: false
    }
});

module.exports = mongoose.model('Type', TypeSchema);