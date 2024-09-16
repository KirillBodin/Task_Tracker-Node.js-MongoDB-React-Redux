const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Get user profile
// Отримання профілю користувача
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Find user by ID from request
        // Знайти користувача за ID з запиту
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // User not found
            // Користувача не знайдено
        }
        res.json(user); // Send user data as response
        // Надіслати дані користувача у відповіді
    } catch (error) {
        res.status(500).json({ message: error.message }); // Server error
        // Помилка сервера
    }
};

// Get all users
// Отримання всіх користувачів
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find(); // Fetch all users from database
    // Отримання всіх користувачів з бази даних
    res.json(users); // Send list of users as response
    // Надіслати список користувачів у відповіді
});

// Update user profile
// Оновлення профілю користувача
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Find user by ID from request
        // Знайти користувача за ID з запиту

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // User not found
            // Користувача не знайдено
        }

        // Update user data
        // Оновлюємо дані користувача
        user.username = req.body.username || user.username; // Update username if provided
        // Оновлюємо ім'я користувача, якщо воно надане
        user.email = req.body.email || user.email; // Update email if provided
        // Оновлюємо електронну пошту, якщо вона надана

        // If a file is uploaded, update profile picture
        // Якщо завантажено файл, оновлюємо фото профілю
        if (req.file) {
            user.profilePicture = req.file.path; // Set profile picture path
            // Встановлюємо шлях до фото профілю
        }

        const updatedUser = await user.save(); // Save updated user to database
        // Зберігаємо оновленого користувача в базі даних

        res.json(updatedUser); // Return updated user as response
        // Повернути оновленого користувача у відповіді
    } catch (error) {
        res.status(500).json({ message: error.message }); // Server error
        // Помилка сервера
    }
};

module.exports = { getUserProfile, updateUserProfile, getUsers };
