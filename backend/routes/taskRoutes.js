const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task routes
router.post('/create', taskController.createTask);
router.post('/deposit', taskController.depositPayment);
router.post('/search', taskController.searchTask);

module.exports = router;
