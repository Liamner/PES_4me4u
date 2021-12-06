const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }],
});

module.exports = mongoose.model('Category', CategorySchema);