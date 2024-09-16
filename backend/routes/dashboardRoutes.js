const express = require('express'); // Імпортуємо express / Import express
const { getDashboardAnalytics } = require('../controllers/dashboardController'); // Імпортуємо контролер для отримання аналітики / Import controller for getting analytics
const { protect } = require('../middleware/authMiddleware'); // Middleware для захисту маршруту / Middleware to protect the route

const router = express.Router(); // Створюємо роутер / Create the router

// Маршрут для отримання аналітики дашборду / Route to get dashboard analytics
router.get('/analytics', protect, getDashboardAnalytics);

module.exports = router; // Експортуємо роутер / Export the router
