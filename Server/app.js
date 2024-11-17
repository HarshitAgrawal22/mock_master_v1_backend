const express = require('express');// here we have imported the express library used for creating javascript server
const cors = require("cors");

const body_parser = require("body-parser")//here we have imported the library which will be used to parse the incoming bodies of the requests   
const userRouter = require("./routes/user_routes");
const questionRouter = require("./routes/question_routes");
const interviewRouter = require("./routes/interview_routes");
const aiRouter = require("./routes/apiRoutes");
const dashboardRouter = require("./routes/dashboard_routes");

const app = express();
// created the instance of the express appliication which will be used to define routes and everything 

app.use(express.json());// this the builtin to express
app.use(cors());

app.use(body_parser.json());
// we have to import it and use it 

app.use("/general", dashboardRouter);
app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/interview", interviewRouter);
app.use("/ai", aiRouter);



module.exports = app;
// exported the app from here 