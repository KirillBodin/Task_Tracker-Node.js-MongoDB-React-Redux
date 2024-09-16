const mongoose = require('mongoose');

// Визначення схеми проекту / Define the Project schema
const projectSchema = mongoose.Schema({
    title: {
        type: String, // Тип даних - рядок / Data type is string
        required: true, // Обов'язкове поле / Required field
    },
    description: {
        type: String, // Тип даних - рядок / Data type is string
        required: true, // Обов'язкове поле / Required field
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId, // Тип даних - ObjectId / Data type is ObjectId
        ref: 'User', // Посилання на модель користувача / Reference to the User model
    },
    startDate: { type: Date, required: true },  // Дата початку проекту / Project start date
    endDate: { type: Date, required: true },  // Дата закінчення проекту / Project end date
}, {
    timestamps: true, // Додає мітки часу створення та оновлення / Add created and updated timestamps
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; // Експортуємо модель проекту / Export the Project model
