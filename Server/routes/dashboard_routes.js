const router = require("express").Router();
const dashboardController = require("../controllers/dashboard_controller");



router.get("/dashboard/:token", dashboardController.dashboard);
// router.post("/check-question", dashboardController);

module.exports = router;