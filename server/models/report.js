const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ReportSchema = new mongoose.Schema({
    userReporting: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    userReported: {     
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required: true 
        
    },
    description: {
        type: 'String',
        required: true
    },
    publishingDate: {
        type: 'Date',
        default: Date.now(),
        required: false
    },
    relatedProduct: {
          
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
        required: false
    },
});

module.exports = mongoose.model('Report', ReportSchema);