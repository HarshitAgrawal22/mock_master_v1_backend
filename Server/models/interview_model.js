const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({

    time: {
        type: String,
        required: true
    },

    // questions: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "questions"
    // }],


    domain: {
        type: String,
        required: true
    },


    u_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    Score: {
        type: Number,
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },

});
// remember when the user is attempting the interview he will be able to see his score , rating , 
const interview = mongoose.model("interviews", interviewSchema);
module.exports = interview;