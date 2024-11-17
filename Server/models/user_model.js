const mongoose = require('mongoose');
const colors = require("../color");
const bcrypt = require('bcrypt');








const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },


    branch: {
        type: String,
        required: false,

    },
    batch: {
        type: String,

    },
    cv: {
        type: String
        , required: true
    },
    resume:
    {
        type: String
        , required: true
    }


});






userSchema.pre("save", async function (next) {
    // this is the pre method which will be invoked before saving a new user 
    // currently we are using it to encrypt the password before saving it  
    try {

        console.log(colors.FgYellow, "hashing the password");

        var user = this;
        //currently this is pointing to the user we are saving

        const salt = await bcrypt.genSalt(10);
        // genrating the salt for adding to the password

        const hashpass = await bcrypt.hash(user.password, salt);
        // adding the salt to the password and saving it to the database

        user.password = hashpass;
        // setting user's password as hashed password  

        console.log(colors.FgCyan, "user have been saved");



        next();

    } catch (error) {
        console.log(colors.FgRed, error);
    }


});



userSchema.methods.comparePassword = async function (recievedPassword) {
    try {
        return await bcrypt.compare(recievedPassword, this.password);
    } catch (error) {
        console.log(colors.FgRed, error);
    }
}



const user = mongoose.model("user", userSchema);

module.exports = user;