const mongoose = require("mongoose");
const colors = require('../color');
// For database connection we can create connection to the database by two methods 

//  mongoose.connect() this we create the connection for whole app 
// mongoose.createConnection() here we connect to the database as a secondary database


// here we have added a funtion so that we can control its execution and handle exceptions
function connectWithDB() {
    // here the school db is the new database we have created by the help of connection string 
    mongoose.connect("mongodb+srv://harsh:Harshit@cluster0.ng24d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        .then(
            () => {
                console.log(colors.FgCyan, "connection established to the main db");
            }
        )



        .catch(
            (err) => {
                console.log(colors.FgRed, err);
            }
        )

}

module.exports = connectWithDB