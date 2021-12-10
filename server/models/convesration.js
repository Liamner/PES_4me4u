const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    members: {type: Array}
})

module.exports = mongoose.model('Message', MessageSchema)