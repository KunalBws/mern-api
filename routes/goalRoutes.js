const { Router } = require('express')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controller/goalController')
const { protect } = require('../middleware/authMiddleware')
const router = require('express').Router()

router.get('/get', protect ,getGoals)

router.post('/set', protect, setGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

module.exports = router