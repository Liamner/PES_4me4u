import mongoose from 'mongoose';
import Category from './category.js';
var Schema = mongoose.Schema;

//var Category = mongoose.model('Category', CategorySchema);

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
        type: ['String'],
        //type: [Schema.ObjectId],
        //type: 'String',
        //ref: "Category",
        enum: categoryType,
        required: true
    },
    description: {
        type: 'String',
        required: false
    },
    publishingDate: {
        type: 'Date',
        default: Date.now(),
        required: false
    },
    exchange: {
        type: 'String',
        enum: exchangeTypes,
        required: true
    },
    img: {
        type: 'String',
        required: false
    },
    state: {
        type: 'String',
        enum: stateTypes,
        required: true
    },
    owner: {
        type: 'String'
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;