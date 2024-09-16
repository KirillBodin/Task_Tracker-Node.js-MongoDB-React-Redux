const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Middleware to protect routes by checking JWT token
// Middleware для захисту маршрутів шляхом перевірки JWT токена
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token is provided in the headers
    // Перевіряємо, чи передано токен у заголовках
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token from header

            // Decode token to get user ID
            // Декодуємо токен для отримання ID користувача
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by ID from token, excluding password
            // Знаходимо користувача за ID з токена, виключаючи пароль
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware
        } catch (error) {
            console.error(error); // Log the error
            res.status(401); // Set status code to 401 (Unauthorized)
            throw new Error('Not authorized, token failed'); // Throw error
        }
    }

    // If token is not provided
    // Якщо токен не передано
    if (!token) {
        res.status(401); // Set status code to 401 (Unauthorized)
        throw new Error('Not authorized, no token'); // Throw error
    }
});

// Middleware to check user role
// Middleware для перевірки ролі користувача
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { // Check if user role is in allowed roles
            res.status(403); // Set status code to 403 (Forbidden)
            throw new Error('Not authorized'); // Throw error
        }
        next(); // Proceed to the next middleware
    };
};

module.exports = { protect, checkRole };
