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
        enum: rolesValidos,
    },
    level: {
        type: Number,
        default: 1,
    },
    ecoPoints: {
        type: Number,
        default: 10,
    },
    score: {
        type: String,
        default: 5.0,
    },
    products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }],
    latitude: {
        type: mongoose.Schema.Types.Double,
        default: null
    },
    longitude: {
        type: mongoose.Schema.Types.Double,
        default: null
    },
    gift: {
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
    /*followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: false
    }],
    followed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required: false
    }],*/
    wishlist: [{
        type: String,
        required: false
    }],
    recentlyViewed: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }],
    commentsRecived: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    commentsDone: [{

        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    rateScore: {
        type: Number,
        default: 0
    },
    totalRateScore: {
        type: Number,
        default: 0
    },
    tradesRated: {
        type: Number,
        default: 0
    },
    strikes: {
        type:Number,
        default: 0
    }
});
    


// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }

module.exports = mongoose.model('Usuario', usuarioSchema);