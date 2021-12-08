const mongoose = require('mongoose');
const Category = require('./category.js');
const Type = require('./type.js');
var Schema = mongoose.Schema;
/* consulta aixoo!: https://cathow.dev/mangosos-con-modelado-de-datos-de-objetos-nodejs/*/

const stateTypes = {
    values: ['available', 'reserved', 'provide']
}


const ProductSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    categories: {     
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
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
    exchange: [{
          
        type: mongoose.Schema.Types.String, 
        ref: "Type.name",
        required: true 
    }], 
    img: [{
        type: Schema.Types.ObjectId, 
        ref: 'Image'
    }],
    state: {
        type: 'String',
        enum: stateTypes,
        default: 'avaiable'
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    username: {
        type: String
    }
});

module.exports = mongoose.model('Product', ProductSchema);