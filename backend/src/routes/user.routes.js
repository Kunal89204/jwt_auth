const express = require("express")
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth")

const {loginUser, registerUser, testRoute, refreshAccessToken} = require("../controllers/user.controller")

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/test',requireAuth,  testRoute)
router.post('/refresh-token', refreshAccessToken);

module.exports = router;