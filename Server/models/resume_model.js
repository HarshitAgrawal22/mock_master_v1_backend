const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    url: {
        type: String,
        required: true
    }

});

const resume = mongoose.model("resumes", resumeSchema);
module.exports = resume;