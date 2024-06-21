const express = require("express")
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth")

const {loginUser, registerUser, testRoute, refreshAccessToken, validate_token} = require("../controllers/user.controller")

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/test',requireAuth,  testRoute)
router.post('/refresh-token', refreshAccessToken);
router.get('/validate-token',requireAuth,  validate_token)

module.exports = router;