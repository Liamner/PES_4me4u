import mongoose from 'mongoose';

export const typeFilter = {
    values: ['tech', 'clothes']
}

/*export const typeFilter = {
    TECH: 1,
    CLOTHES: 2
}*/
const createProductSchema = new mongoose.Schema({
    title: 'String',
    description: 'String',
    filter: [typeFilter]
});

const CreateProduct = mongoose.model('CreateProduct', createProductSchema);

export default CreateProduct;