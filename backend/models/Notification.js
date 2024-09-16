const mongoose = require('mongoose');

// Define the Notification schema
// Визначення схеми сповіщення
const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model / Посилання на модель користувача
    message: { type: String, required: true }, // Notification message / Повідомлення сповіщення
    read: { type: Boolean, default: false }, // Indicates whether the notification has been read / Вказує, чи було прочитане сповіщення
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the notification was created / Мітка часу, коли було створено сповіщення
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification; // Export the Notification model / Експортуємо модель сповіщення
