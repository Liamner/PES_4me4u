const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
require('mongoose-double')(mongoose);

let rolesValidos = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} no es un role válido'
}
let Schema = mongoose.Schema;

let adminSchema = new Schema({
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
        default: 'ADMIN',
        enum: rolesValidos,
    },
    gifts: {
        type: Number,
        default: 0,
    },
    loans: {
        type: Number,
        default: 0,
    },
    changes: {
        type: Number,
        default: 0
    },
    users: {
        type: Number,
        default: 0
    },
    products: {
        type: Number,
        default: 0
    },
    ecoPoints: {
        type: Number,
        default: 0
    },
    blockedUsers: [{
        type: Number,
        default: 0
    }]
});
    


// elimina la key password del objeto que retorna al momento de crear un usuario
adminSchema.methods.toJSON = function() {
    let admin = this;
    let adminObject = admin.toObject();
    delete adminObject.password;
    return adminObject;
 }

//agregamos el plugin de validación única y exportamos el modelo recién creado
/*
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})
*/
module.exports = mongoose.model('Admin', adminSchema);