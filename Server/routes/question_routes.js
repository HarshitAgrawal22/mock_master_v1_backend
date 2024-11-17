const router = require("express").Router();

const questionsController = require("../controllers/questions_controller");

router.post("/create-question", questionsController.createQuestion);

router.post("/list-question", questionsController.listQuestionsOfInterview);

router.delete("/delete-question", questionsController.deleteQuestion);

module.exports = router;