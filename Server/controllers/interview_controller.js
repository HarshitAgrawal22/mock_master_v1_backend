
const interviewServices = require("../services/interviewServices");
const colors = require("../color");
const userServices = require("../services/user_services");



exports.createInterview = async (req, res) => {
    try {
        const InterviewDetails = req.body;
        console.log(InterviewDetails);
        const newInterview = await interviewServices.createInterview(InterviewDetails);
        if (!newInterview) {
            res.status(401).json({
                status: false,
                message: "interview not saved"
            });
        } else {
            console.log(colors.FgYellow, newInterview);
            res.status(201).json({
                status: true,
                interview: newInterview
            });
        }
    } catch (error) {
        console.log(colors.BgRed, error);
    }

}




exports.listPersonalInterview = async (req, res) => {
    try {
        console.log("started");
        const token = req.params.id;

        const personalInterview = await interviewServices.listPersonalInterview(token);
        res.status(200).json({
            status: true,
            interviews: personalInterview
        })
    } catch (error) {

        console.log(colors.BgRed, error);
    }

}






exports.deletePersonalInterview = async (req, res) => {
    const id = req.params.id;

    const deletedInterview = await interviewServices.deleteInterview(id);

    res.status(200).json({
        status: true,
        message: "interview deleted successfully "
    });

}