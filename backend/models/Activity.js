const mongoose = require('mongoose');

// Define the Activity schema
// Визначення схеми активності
const activitySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model / Посилання на модель користувача
            required: true, // Required field / Обов'язкове поле
        },
        action: {
            type: String,
            required: true, // Description of the action performed / Опис дії, що була виконана
        },
        details: {
            type: String,
            required: true, // Additional details about the action / Додаткові деталі про дію
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields / Автоматичне додавання полів createdAt та updatedAt
    }
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity; // Export the Activity model / Експортуємо модель активності
