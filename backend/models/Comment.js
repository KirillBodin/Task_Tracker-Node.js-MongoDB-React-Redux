const mongoose = require('mongoose');

// Define the Comment schema
// Визначення схеми коментаря
const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Reference to the User model / Посилання на модель користувача
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Task', // Reference to the Task model / Посилання на модель задачі
        },
        text: {
            type: String,
            required: true, // Comment text / Текст коментаря
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields / Автоматичне додавання полів createdAt та updatedAt
    }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment; // Export the Comment model / Експортуємо модель коментаря
