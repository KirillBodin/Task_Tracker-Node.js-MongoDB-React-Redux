const Activity = require('../models/Activity');

// Get all activities with user information / Получение активности с информацией о пользователе
const getActivities = async (req, res) => {
    try {
        // Fetch all activities and populate the user field with username / Получаем все активности и заполняем поле пользователя именем пользователя
        const activities = await Activity.find().populate('user', 'username');
        res.json(activities); // Return the activities / Возвращаем активности
    } catch (error) {
        // Handle any errors that occur / Обработка любых ошибок, которые возникают
        res.status(500).json({ message: 'Failed to fetch activities' }); // Send a 500 error if fetching activities fails / Отправить ошибку 500, если не удалось получить активности
    }
};

// Get activities for a specific user / Получение активности конкретного пользователя
const getUserActivity = async (req, res) => {
    try {
        // Fetch activities for the logged-in user and populate the user field with username / Получаем активности для текущего пользователя и заполняем поле пользователя именем пользователя
        const activities = await Activity.find({ user: req.user._id }).populate('user', 'username');
        res.json(activities); // Return the activities / Возвращаем активности
    } catch (error) {
        // Handle any errors that occur / Обработка любых ошибок, которые возникают
        res.status(500).json({ message: 'Failed to fetch user activities' }); // Send a 500 error if fetching user activities fails / Отправить ошибку 500, если не удалось получить активности пользователя
    }
};

module.exports = { getActivities, getUserActivity };
