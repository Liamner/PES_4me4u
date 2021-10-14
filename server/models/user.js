/*
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
*/

//const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let rolesValidos = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} no es un role válido'
}
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    pwd: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: rolesValidos,
    },
    location: {
        type: String,
        default: 'BARCELONA',
        //required: [true],
        //enum: rolesValidos,
    },
    level: {
        type: String,
        default: '1',
    },
    postalCode: {
        type: String,
        default: '08028',
    },
    ecoPoints: {
        type: String,
        default: '10',
    },
    score: {
        type: String,
        default: '5.0',
    }
});

// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }

//agregamos el plugin de validación única y exportamos el modelo recién creado
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})
//module.exports = mongoose.model('Usuario', usuarioSchema);
const LoginRegister = mongoose.model('LoginRegister', usuarioSchema);
export default LoginRegister;