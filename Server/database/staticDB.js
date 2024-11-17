const mongoose = require('mongoose');
const colors = require('../color');

// remember to make database available to everyone from mongo atlas 
const connection = mongoose.createConnection("mongodb+srv://aditya:lodaDhaari@cluster0.gfkl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").on("connected", () => {
    console.log(
        colors.FgBlue
        , "connected to staticQuestionDB");
})
    .on("open", () => {
        console.log(colors.FgBlue
            , "Static question DB started");
    })
    .on("error", (err) => {
        console.log(colors.FgRed, err);
    });


module.exports = connection;