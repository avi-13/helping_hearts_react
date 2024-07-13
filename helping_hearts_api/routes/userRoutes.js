const router = require("express").Router();

const userController = require("../controller/user_controller/userControllers");

// create account routes
router.post("/register", userController.createUser);

// login routes

router.post("/login", userController.loginUser);

router.post("/send_otp", userController.sendVerification);

router.get("/get-all-users", userController.getAllUsers);

router.get("/single_user/:id", userController.getSingleUser);

router.put("/updateUser/:id", userController.updateUser);

router.post("/forgetpassword", userController.forgetPassword);


module.exports = router;
