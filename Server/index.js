const app = require("./app");
const connectWithDB = require("./database/mainDB");

const cv = require('./models/cv_model');
const resume = require("./models/resume_model");
const user = require("./models/user_model");
const question = require("./models/questions_model");
const interview = require("./models/interview_model");

const staticQuestion = require("./models/instanceDB.js/staticQuestions");

connectWithDB();
// invoked the function from db.js and extablished the connection with the database 


// this is the format in which we will be receiving the data and remember it is method





// put => update completely
// post => send data to backend
// delete=> delete
// get=> retrieve data from backend 
// patch => partial update






let port = 4000
// here the 8000 is the port on which the server is currently running 
app.listen(port, () => {
    console.log(`my server has been started \nhit => http://127.0.0.1:${port} \n`)
})
//The app.listen(8000, () => { console.log("my server has been started"); }); line is crucial in an Express application as it initializes the server to listen for incoming requests on port 8000 and provides feedback to the developer by logging a message to the console when the server starts successfully.








app.get("/", (req, res) => { res.send("<h1>  Hello this is harshit this side  </h1>   ") });






