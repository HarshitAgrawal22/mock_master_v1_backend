const mongoose = require('mongoose');
const interview = require('./interview_model');

const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },

    tip: {
        type: String,
        required: true,
    },
    interviewID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    }
});

const question = mongoose.model("questions", questionSchema);
module.exports = question;