const mongoose = require('mongoose');
const Category = require('./category.js');
const User = require('./user.js');
var Schema = mongoose.Schema;

const TradeGiveSchema = new mongoose.Schema({

    userOfering: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    userTaking: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true 
    },
    publishingDate: {
        type: 'Date',
        default: Date.now(),
        required: false
    },
    points:{
        type:Number
    }
});

module.exports = mongoose.model('TradeGive', TradeGiveSchema);