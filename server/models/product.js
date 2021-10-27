const mongoose = require('mongoose');
const Category = require('./category.js');
const Type = require('./type.js');
var Schema = mongoose.Schema;

const categoryType = {
    values: ['tech', 'house']
}

const exchangeTypes = {
    values: ['present', 'exchange', 'provide']
}

const stateTypes = {
    values: ['available', 'reserved', 'provide']
}


const ProductSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    categories: {
        
        /*type: ['String'],
        enum: categoryType,
        required: true*/
        type: [Schema.ObjectId],
        ref: "Category",
        required: true
    },
    description: {
        type: 'String'
    },
    publishingDate: {
        type: 'Date',
        default: Date.now(),
        required: false
    },
    exchange: {

        /*type: ['String'],
        enum: exchangeTypes,
        required: true*/
        type: [Schema.ObjectId],
        ref: "Type",
        required: true
    },
    img: {
        type: 'String',
        required: false
    },
    state: {
        type: 'String',
        enum: stateTypes
    },
    owner: {
        type: 'String'
    }
});


module.exports = mongoose.model('Product', ProductSchema);