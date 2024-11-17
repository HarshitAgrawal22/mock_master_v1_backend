const router = require('express').Router();
const interviewController = require("../controllers/interview_controller");


router.post("/create-interview", interviewController.createInterview);
router.delete("/delete-interview", interviewController.deletePersonalInterview);
router.get("/personal-interview/:id", interviewController.listPersonalInterview);

module.exports = router;