const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    public_id: {type: String},
    url: {type: String}
});

module.exports = mongoose.model('Image', imageSchema);