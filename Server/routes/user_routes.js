const router = require('express').Router();
const userContoller = require("../controllers/user_controller");

router.post("/register", userContoller.register);
router.get("/list-all", userContoller.listAllUser);
router.post("/login", userContoller.login);
router.get("/user-profile/:token", userContoller.userDetails);


module.exports = router;