import mongoose from 'mongoose';

export const typeFilter = {
    values: ['tech', 'clothes', 'none']
}

/*export const typeFilter = {
    TECH: 1,
    CLOTHES: 2
}*/
const ProductSchema = new mongoose.Schema({
    title: 'String',
    description: 'String',
    filter: {
        type: 'String',
        enum: typeFilter,
        default: 'none'
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;