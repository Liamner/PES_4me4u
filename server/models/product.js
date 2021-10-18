//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const createProductSchema = mongoose.Schema({
    title: 'String',
    description: 'String',
    id: 'String',
    //categories[]: 'String', 
    publishingDate: 'date',
    exchangeType: 'String',
    photo: 'String',
    state: 'String',
    owner: 'String'
});

//const CreateProduct = mongoose.model('CreateProduct', createProductSchema);

//export default CreateProduct;
module.exports = mongoose.model('CreateProduct', createProductSchema);