const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    convesrationId: { type: String},
    sender : {type: String},
    text :{ type: String}
})

module.exports = mongoose.model('Message', MessageSchema)