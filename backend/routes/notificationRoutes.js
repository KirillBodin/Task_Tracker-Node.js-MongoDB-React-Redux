const express = require('express'); // Імпортуємо express / Import express
const { getNotifications, markAsRead } = require('../controllers/notificationController'); // Імпортуємо контролери для обробки сповіщень / Import controllers for handling notifications
const { protect } = require('../middleware/authMiddleware'); // Middleware для захисту маршрутів / Middleware to protect routes

const router = express.Router(); // Створюємо роутер / Create the router

// Маршрут для отримання сповіщень користувача / Route to get user notifications
router.get('/', protect, getNotifications);

// Маршрут для позначення сповіщення як прочитаного / Route to mark a notification as read
router.put('/:id/read', protect, markAsRead);

module.exports = router; // Експортуємо роутер / Export the router
