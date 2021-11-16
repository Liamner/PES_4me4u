const mongoose = require('mongoose');
const Category = require('./category.js');
const Type = require('./type.js');
//var Schema = mongoose.Schema;
/* consulta aixoo!: https://cathow.dev/mangosos-con-modelado-de-datos-de-objetos-nodejs/*/

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
       /* type: [Schema.name],
        ref: "Category",
        required: true*/
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        
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

        type: ['String'],
        enum: exchangeTypes,
        required: true
        
      /* type: [Schema.name],
        ref: "Type",
        required: true*/
        //type: mongoose.Schema.Types.ObjectId, ref: 'Type' 
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