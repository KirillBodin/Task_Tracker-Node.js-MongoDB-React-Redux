// Middleware to handle 404 errors for undefined routes
// Middleware для обробки 404 помилок для не визначених маршрутів
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404); // Set the response status code to 404
    next(error); // Pass the error to the next middleware
};

// Middleware for error handling
// Middleware для обробки помилок
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status code is 200, change it to 500 / Якщо статус 200, змініть його на 500
    res.status(statusCode); // Set the response status code
    res.json({
        message: err.message, // Provide the error message
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Show stack trace only in development mode / Показати стек трейс тільки в режимі розробки
    });
};

module.exports = { notFound, errorHandler };
