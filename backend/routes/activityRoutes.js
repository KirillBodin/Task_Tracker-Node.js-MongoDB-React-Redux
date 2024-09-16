const express = require('express'); // Імпортуємо express / Import express
const router = express.Router(); // Створюємо роутер / Create the router
const { protect } = require('../middleware/authMiddleware'); // Імпортуємо middleware для захисту маршрутів / Import middleware to protect routes
const { getActivities, getUserActivity } = require('../controllers/activityController'); // Імпортуємо контролери для активностей / Import controllers for activities

// Маршрут для отримання всіх активностей / Route to get all activities
router.get('/', protect, getActivities);

// Маршрут для отримання активності конкретного користувача / Route to get a specific user's activity
router.get('/myactivity', protect, getUserActivity);

module.exports = router; // Експортуємо роутер / Export the router
