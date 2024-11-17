const interview = require("../models/interview_model");
const { deleteMany } = require("../models/user_model");
const colors = require("../color");
const userServices = require("../services/user_services");

class interviewServices {

    static async createInterview(InterviewDetails) {
        try {

            const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            // Adding leading zeros for single digit values
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');

            const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            const { email, id } = await userServices.verifyJWT(InterviewDetails.token)
            console.log(id + "      " + InterviewDetails.token);
            const newInterview = new interview({

                u_id: id,
                domain: "IT",
                time: time,
                Score: InterviewDetails.score,
                resume: InterviewDetails.resume,
                cv: InterviewDetails.cv
            });
            return await newInterview.save();

        } catch (error) {
            console.log(colors.FgRed, error);
        }

    }

    static async listPersonalInterview(u_id) {
        try {
            return await interview.find({ u_id: u_id });
        } catch (error) {
            console.log(colors.FgRed, error);
        }
    }

    static async deleteInterview(u_id) {
        try {

            return await interview.deleteMany({ u_id: u_id });
        } catch (error) {
            console.log(colors.FgRed, err);
        }
    }

}

module.exports = interviewServices;