const mongoose = require('mongoose');

// Define the Comment schema
// Визначення схеми коментаря
const commentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model / Посилання на модель користувача
    text: { type: String, required: true }, // Comment text / Текст коментаря
    createdAt: { type: Date, default: Date.now } // Timestamp of creation / Мітка часу створення
});

// Define the Task schema
// Визначення схеми задачі
const taskSchema = mongoose.Schema({
    title: { type: String, required: true }, // Task title / Назва задачі
    description: { type: String, required: true }, // Task description / Опис задачі
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Reference to Project model / Посилання на модель проекту
    status: { type: String, enum: ['Backlog', 'In Progress', 'Review', 'Done'], default: 'Backlog' }, // Task status / Статус задачі
    comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String }], // Comments on the task / Коментарі до задачі
    startDate: { type: Date, required: true }, // Start date of the task / Дата початку задачі
    endDate: { type: Date, required: true }, // End date of the task / Дата закінчення задачі
    timeSpent: { type: Number, default: 0 }, // Time spent on the task / Час, витрачений на задачу
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model / Посилання на модель користувача
        ref: 'User',
    },
}, {
    timestamps: true, // Add createdAt and updatedAt timestamps / Додає мітки часу створення та оновлення
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // Export the Task model / Експортуємо модель задачі
