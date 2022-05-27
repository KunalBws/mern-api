const { registerUser, loginUser, getMe } = require('../controller/userController')
const router = require('express').Router()
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/getme',protect, getMe)

module.exports = router
