const router = require("express").Router();
const adminController = require("./controller");
const authMiddleware = require("../../middleware/auth");


// Sign UP
router.post('/signup', adminController.adminSignUp)

// Login
router.post('/login', adminController.adminLogin)


// Get Me
router.get('/getMe', authMiddleware, adminController.getMe)


module.exports = router



