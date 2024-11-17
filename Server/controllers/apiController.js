const AiWorker = require("../services/AiServieces");
const colors = require('../color');
const userServices = require("../services/user_services");
// const dashboard = require("./dashboard_controller");
exports.generateQuestions = async (req, res) => {
    try {
        const details = req.body;


        const { id, email } = await userServices.verifyJWT(details.token);
        const user = await userServices.updateCvAndResume(id, details.resume, details.cv);

        const questions = await AiWorker.questionGenerator(user);
        console.log(colors.FgYellow, questions);
        res.status(200).json({
            status: true,
            questions: questions.split("\n")
        });
    } catch (error) {
        console.log(colors.FgRed, error);
    }
    // {
    //     "name":"harshit agrawal",
    //     "branch":"Btech(Computer Science)",
    //     "batch":"2022-2026",
    //     "cv":"/media/resume/sodapdf-converted.pdf",
    //     "resume":"/media/resume/myresume-2024-04-02T14-00-56.743Z.pdf"

    // }
}

exports.checkQuestionAnswers = async (req, res) => {
    try {
        const questionAnswer = req.body;
        const score = (await AiWorker.checkQuestionAndAnswer(questionAnswer)).split("\n");
        // dashboard.dashboard();
        console.log(score);
        res.status(200).json({
            status: true,
            score: score[0],
            tip: score[1],
            crossQuestion: score[2]
        });
    } catch (error) {
        console.log(colors.FgRed, error);
    }
}

exports.generateCrossQuestion = async (req, res) => {
    try {
        const questionAnswer = req.body;
        const score = (await AiWorker.generateCrossQuestion(questionAnswer));
        // dashboard.dashboard();
        console.log(colors.FgYellow, score);
        res.status(200).json({
            status: true,

            crossQuestion: score
        });
    } catch (error) {
        console.log(colors.FgRed, error);
    }
}