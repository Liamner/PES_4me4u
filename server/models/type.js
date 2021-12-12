const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    products: {
        type: ['String'],
        required: false
    }
});

module.exports = mongoose.model('Type', TypeSchema);