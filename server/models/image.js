const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    public_id: {type: String},
    url: {type: String}
});

imageSchema.pre('deleteMany', function(next) {
    // Remove all the assignment docs that reference the removed person.
    console.log(this._id)
    this.model('Product').deleteOne({ product: this._id }, next);
});

module.exports = mongoose.model('Image', imageSchema);