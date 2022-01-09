const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TypeSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Type', TypeSchema);