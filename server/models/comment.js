const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        // Usuario que crea el comentario
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    rateScore: {
        type: Number,
        default: 0
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('Comment', commentSchema);