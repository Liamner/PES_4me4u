const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
require('mongoose-double')(mongoose);

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
    exchanges: {
        type: Number,
        default: 0
    },
    users: {
        type: [mongoose.Schema.usuarioSchema],
        required: false
    },
    products: {
        type: [mongoose.Schema.ProductSchema],
        required: false
    },
    ecoPoints: {
        type: Number,
        default: 0
    },
    blockedUsers: [{
        // Comentarios recibidos
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }]
});
    


// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }

//agregamos el plugin de validación única y exportamos el modelo recién creado
/*
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})
*/
module.exports = mongoose.model('Usuario', usuarioSchema);