const questionm = require("../models/questions_model");


class questionServices {


    static async createQuestion(cquestion, answer, tip, interviewID) {

        const newQuestion = new questionm({
            question: cquestion,
            answer: answer,
            tip: tip,
            interviewID: interviewID
        });
        return await newQuestion.save();

    }

    static async listQuestionsOfInterview(id) {
        return await question.find({ interviewID: id });
    }

    static async deleteQuestionsOfInterview(id) {
        await question.deleteMany({ interviewID: id });
    }
}

module.exports = questionServices;