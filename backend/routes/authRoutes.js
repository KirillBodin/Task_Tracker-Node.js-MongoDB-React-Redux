const express = require('express'); // Імпортуємо express / Import express
const { registerUser, authUser } = require('../controllers/authController'); // Імпортуємо контролери для реєстрації та авторизації користувача / Import controllers for user registration and authentication

const router = express.Router(); // Створюємо роутер / Create the router

// Маршрут для реєстрації користувача / Route for user registration
router.post('/register', registerUser);
// Маршрут для входу користувача / Route for user login
router.post('/login', authUser);

module.exports = router; // Експортуємо роутер / Export the router
