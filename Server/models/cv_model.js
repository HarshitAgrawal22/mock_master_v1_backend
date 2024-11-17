const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    url: {
        type: String,
        required: true
    }

});

const cv = mongoose.model("cvs", cvSchema);
module.exports = cv;