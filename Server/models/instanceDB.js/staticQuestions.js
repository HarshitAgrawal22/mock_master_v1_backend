const mongoose = require('mongoose');
const instanceDB = require("../../database/staticDB");
const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
    },

});

const question = instanceDB.model("questions", questionSchema);
module.exports = question;