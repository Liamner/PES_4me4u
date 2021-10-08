import mongoose from 'mongoose';

const createProductSchema = mongoose.Schema({
    title: 'String',
    description: 'String'
});

const CreateProduct = mongoose.model('CreateProduct', createProductSchema);

export default CreateProduct;