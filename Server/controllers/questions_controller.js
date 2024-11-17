const questionServices = require("../services/question_services");
const colors = require("../color");

exports.createQuestion = async (req, res) => {

    try {
        const { question, answer, tip, interviewID } = req.body;
        console.log(req.body);
        const newQuestion = await questionServices.createQuestion(question, answer, tip, interviewID);

        if (!newQuestion) {
            res.status(400).json({
                status: false,
                message: "the question wasn't saved"
            });
        }
        else {
            res.status(200).json({
                status: true,
                question: newQuestion._id
            });
        }


    } catch (error) {

        console.log(colors.FgRed, error);
    }
}

exports.listQuestionsOfInterview = async (req, res) => {

    try {
        const { id } = req.body;
        const questions = await questionServices.listQuestionsOfInterview(id);
        res.status(200).json({
            status: true,
            questions: questions
        });
    } catch (error) {

        console.log(colors.FgRed, error);
    }
}


exports.deleteQuestion = async (req, res) => {

    try {

        const { id } = req.body;
        await questionServices.deleteQuestion(id);
        res.status(200).json({
            status: true,
            message: "question deleted successfully"
        });
    } catch (error) {

        console.log(colors.FgRed, error);
    }
}