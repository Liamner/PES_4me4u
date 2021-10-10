import mongoose from 'mongoose';

export const typeObject = {
    values: ['tech', 'clothes', 'none']
}

export const actions = {
    values: ['present', 'exchange ', 'none']
}

const ProductSchema = new mongoose.Schema({
    title: 'String',
    description: 'String',
    objectFilter: {
        type: 'String',
        enum: typeObject,
        default: 'none',
        required: false
    },
    actionFilter: {
        type: 'String',
        enum: actions,
        default: 'none',
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;