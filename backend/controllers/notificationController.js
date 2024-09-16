const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');

// Get user notifications / Отримання повідомлень користувача
const getNotifications = asyncHandler(async (req, res) => {
    // Fetch notifications for the current user, sorted by timestamp in descending order / Отримання повідомлень для поточного користувача, відсортованих за часовими мітками у зворотному порядку
    const notifications = await Notification.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(notifications); // Return the notifications / Повертаємо повідомлення
});

// Mark notification as read / Позначити повідомлення як прочитане
const markAsRead = asyncHandler(async (req, res) => {
    // Find notification by ID / Знаходимо повідомлення за ID
    const notification = await Notification.findById(req.params.id);

    if (notification) {
        notification.read = true; // Mark the notification as read / Позначаємо повідомлення як прочитане
        await notification.save(); // Save the updated notification / Зберігаємо оновлене повідомлення
        res.json({ message: 'Notification marked as read' }); // Return success message / Повертаємо повідомлення про успіх
    } else {
        res.status(404); // Set status to 404 if notification is not found / Встановлюємо статус 404, якщо повідомлення не знайдено
        throw new Error('Notification not found'); // Throw an error if notification is not found / Кидаємо помилку, якщо повідомлення не знайдено
    }
});

module.exports = { getNotifications, markAsRead };
