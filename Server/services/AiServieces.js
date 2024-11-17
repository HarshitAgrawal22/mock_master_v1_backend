const { GoogleGenerativeAI } = require('@google/generative-ai');
const colors = require("../color");
class AiWorker {



    static async questionGenerator(details) {
        const name = details.name;
        const branch = details.branch;
        const batch = details.batch;
        const cvText = await this.pdfToText(details.cv);
        const resumeText = await this.pdfToText(details.resume);
        console.log(colors.FgCyan, cvText);
        console.log((colors.FgMagenta, resumeText));


        const genAI = new GoogleGenerativeAI('AIzaSyDEhejvfjtboB4PI1JLY92DYEPrkm9Mvn8');
        // Choose a model that's appropriate for your use case.
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

        const finalPrompt = `Based on the following information, generate a list of 10 questions for an interview candidate:

                                Name: ${name}
                                Branch: ${branch}
                                Batch: ${batch}

                                CV: ${cvText}

                                Resume: ${resumeText}

                            The questions should be relevant to the candidate's background and experience as detailed in the CV and resume. Please separate each question with a newline.`;

        const result = await model.generateContent(finalPrompt);
        const response = result.response;
        const text = response.text();
        return text;
    }





    static async checkQuestionAndAnswer(QuesAnsPair) {
        const question = QuesAnsPair.question;
        const answer = QuesAnsPair.answer;

        const genAI = new GoogleGenerativeAI('AIzaSyDEhejvfjtboB4PI1JLY92DYEPrkm9Mvn8');
        // Choose a model that's appropriate for your use case.
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

        const finalPrompt = `Based on the following question and answer, rate the answer on a scale from 0 to 100, and provide a tip to make it better and generate a relevant follow-up hard question.:\n\n`
            + `Question: ${question}\n`
            + `Answer: ${answer}\n\n`
            + `Response should be in the format:\n`
            + `the first line will contain Score: <score>\n`
            + `second line will contain the tip:  Tip: <tip>\n`
            + `third line will contain the cross-question: cross-question`;
        ;

        const result = await model.generateContent(finalPrompt);
        const response = result.response;
        const text = response.text();
        return text;
    }
    static async generateCrossQuestion(QuesAnsPair) {
        const question = QuesAnsPair.question;
        const answer = QuesAnsPair.answer;

        const genAI = new GoogleGenerativeAI('AIzaSyDEhejvfjtboB4PI1JLY92DYEPrkm9Mvn8');
        // Choose a model that's appropriate for your use case.
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

        const finalPrompt = `Based on the following question and answer, generate a relevant follow-up hard question.\n\n`
            + `Question: ${question}\n`
            + `Answer: ${answer}\n\n`
            + `Response format: cross-question only`;

        const result = await model.generateContent(finalPrompt);
        const response = result.response;
        const text = await response.text();

        return text.trim(); // Return the plain text question
    }






    static async pdfToText(url) {

        const response = await fetch("http://ideaflux.pythonanywhere.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: `http://popcornwar.pythonanywhere.com${url}` })
        }

        );

        const objext = await response.json()

        return objext.text
    }
}








module.exports = AiWorker;