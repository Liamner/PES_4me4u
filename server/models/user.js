import mongoose from 'mongoose';

const createUserSchema = mongoose.Schema({
    userId: 'String',
    email: 'String',
    pwd: 'String',
    location: 'String',
    level: 'String',
    postalCode: 'String',
    //ecoPoints: 'Integer',
    //score: 'Integer'
});

const CreateUser = mongoose.model('CreateUser', createUserSchema);

export default CreateUser;