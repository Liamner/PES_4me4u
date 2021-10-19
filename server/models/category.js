const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    products: {
        //atencio falta linkejar amb productes
        type: ['String'],
        required: false
    }
});

module.exports = mongoose.model('Category', CategorySchema);