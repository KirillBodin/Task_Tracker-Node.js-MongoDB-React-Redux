const express = require('express');
const { getProjectStatusReport, getTaskCompletionReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Захищений маршрут для отримання звіту про статус проектів / Protected route to get the project status report
router.get('/projects', protect, getProjectStatusReport);

// Захищений маршрут для отримання звіту про завершення задач / Protected route to get the task completion report
router.get('/tasks', protect, getTaskCompletionReport);

module.exports = router; // Експортуємо роутер / Export the router
