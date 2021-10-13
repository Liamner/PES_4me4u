import mongoose from 'mongoose';

const category = {
    values: ['tech', 'house']
}

const CategorySchema = new mongoose.Schema({
    name: {
        type: 'String',
        enum: values,
        required: true
    },
    products: {
        type: [product],
        required: false
    }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
