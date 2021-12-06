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
        default: 'USER',
        //required: [true],
        enum: rolesValidos,
    },
    latitude: {
        type: String,
        default: '41.3879',
        //required: [true],
    },
    longitude: {
        type: String,
        default: '2.16992 41° 23′ 16″',
    },
    level: {
        type: String,
        default: '1',
    },
    ecoPoints: {
        type: String,
        default: '10',
    },
    score: {
        type: String,
        default: '5.0',
    },
    products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }],
    latitude: {
        type: mongoose.Schema.Types.Double,
        default: 37.78825
    },
    longitude: {
        type: mongoose.Schema.Types.Double,
        default: -122.4324
    },
    followers: {
        type: [mongoose.Schema.usuarioSchema],
        required: false
    },
    followed: {
        type: [mongoose.Schema.usuarioSchema],
        required: false
    },
    wishlist: {
        type: [mongoose.Schema.ProductSchema],
        required: false
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
/*
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})
*/
module.exports = mongoose.model('Usuario', usuarioSchema);