const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
    {
        members: {type: Array},
        productId: {type: String}
    },
    {timestamps: true}
)

module.exports = mongoose.model('Conversation', MessageSchema)