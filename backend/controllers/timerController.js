// controllers/timerController.js
const Task = require('../models/Task');

// Start task timer
// Запуск таймера задачі
const startTaskTimer = async (req, res) => {
    const { taskId } = req.params; // Get task ID from request parameters / Отримання ID задачі з параметрів запиту

    try {
        const task = await Task.findById(taskId); // Find task by ID / Знайти завдання за ID

        if (!task) { // If task not found / Якщо завдання не знайдено
            return res.status(404).json({ message: 'Task not found' }); // Respond with 404 status and message / Відповідь з статусом 404 і повідомленням
        }

        task.timerStart = Date.now(); // Set the current time as the start time for the timer / Встановити поточний час як час початку таймера
        await task.save(); // Save the updated task with the new start time / Зберегти оновлене завдання з новим часом початку

        res.status(200).json({ message: 'Task timer started', task }); // Respond with 200 status and updated task / Відповідь зі статусом 200 і оновленим завданням
    } catch (error) { // Catch any errors / Ловити будь-які помилки
        res.status(500).json({ message: 'Error starting timer', error }); // Respond with 500 status and error message / Відповідь зі статусом 500 і повідомленням про помилку
    }
};

// Stop task timer
// Зупинка таймера задачі
const stopTaskTimer = async (req, res) => {
    const { taskId } = req.params; // Get task ID from request parameters / Отримання ID задачі з параметрів запиту

    try {
        const task = await Task.findById(taskId); // Find task by ID / Знайти завдання за ID

        if (!task) { // If task not found / Якщо завдання не знайдено
            return res.status(404).json({ message: 'Task not found' }); // Respond with 404 status and message / Відповідь з статусом 404 і повідомленням
        }

        const currentTime = Date.now(); // Get the current time / Отримання поточного часу
        const elapsedTime = currentTime - task.timerStart; // Calculate elapsed time / Розрахунок витраченого часу
        task.timeSpent += elapsedTime; // Add elapsed time to total time spent / Додати витрачений час до загального витраченого часу
        task.timerStart = null; // Reset the start time / Скидання часу початку
        await task.save(); // Save the updated task with accumulated time / Зберегти оновлене завдання з накопиченим часом

        res.status(200).json({ message: 'Task timer stopped', task }); // Respond with 200 status and updated task / Відповідь зі статусом 200 і оновленим завданням
    } catch (error) { // Catch any errors / Ловити будь-які помилки
        res.status(500).json({ message: 'Error stopping timer', error }); // Respond with 500 status and error message / Відповідь зі статусом 500 і повідомленням про помилку
    }
};

// Reset task timer
// Скидання таймера задачі
const resetTaskTimer = async (req, res) => {
    const { taskId } = req.params; // Get task ID from request parameters / Отримання ID задачі з параметрів запиту

    try {
        const task = await Task.findById(taskId); // Find task by ID / Знайти завдання за ID

        if (!task) { // If task not found / Якщо завдання не знайдено
            return res.status(404).json({ message: 'Task not found' }); // Respond with 404 status and message / Відповідь з статусом 404 і повідомленням
        }

        task.timerStart = null; // Reset the start time / Скидання часу початку
        task.timeSpent = 0; // Reset the total time spent / Скидання загального витраченого часу
        await task.save(); // Save the updated task with reset values / Зберегти оновлене завдання з скинутими значеннями

        res.status(200).json({ message: 'Task timer reset', task }); // Respond with 200 status and updated task / Відповідь зі статусом 200 і оновленим завданням
    } catch (error) { // Catch any errors / Ловити будь-які помилки
        res.status(500).json({ message: 'Error resetting timer', error }); // Respond with 500 status and error message / Відповідь зі статусом 500 і повідомленням про помилку
    }
};

module.exports = { startTaskTimer, stopTaskTimer, resetTaskTimer }; // Export the controller functions / Експортувати функції контролера
