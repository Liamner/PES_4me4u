const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
        members: [{
            type: Schema.Types.ObjectId, 
            ref: 'Usuario'
        }],
        productId: {
            type: Schema.Types.ObjectId, 
            ref: 'Product'
        }
    },
    //{timestamps: true}
)

module.exports = mongoose.model('Conversation', MessageSchema)