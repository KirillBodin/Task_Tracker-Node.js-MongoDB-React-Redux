const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/authMiddleware');
const { getStats } = require('../controllers/statsController');

// Маршрут для отримання статистики / Route to get statistics
router.route('/')
    .get(protect, checkRole(['admin']), getStats); // Отримати статистику / Get statistics

module.exports = router; // Експортуємо роутер / Export the router
