const router = require("express").Router();
const apiController = require("../controllers/apiController");



router.post("/generate_questions", apiController.generateQuestions);
router.post("/check-question", apiController.checkQuestionAnswers);
router.post("/get-cross-question", apiController.generateCrossQuestion);
module.exports = router;