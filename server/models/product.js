import mongoose from 'mongoose';

export const typeObject = {
    values: ['tech', 'clothes', 'none']
}

export const actions = {
    values: ['present', 'exchange ', 'none']
}

const ProductSchema = new mongoose.Schema({
    title: 'String',
    description: 'String'
    
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;