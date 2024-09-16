const Task = require('../models/Task');
const Activity = require('../models/Activity'); // Importing the Activity model / Імпорт моделі Activity

// Add comment to a task / Додавання коментаря до задачі
const addCommentToTask = async (req, res) => {
    const { taskId } = req.params; // Extract taskId from request parameters / Витягнення taskId з параметрів запиту
    const { text } = req.body; // Extract comment text from request body / Витягнення тексту коментаря з тіла запиту

    try {
        const task = await Task.findById(taskId); // Find the task by ID / Знайти задачу за ID

        if (!task) {
            return res.status(404).json({ message: 'Task not found' }); // Return 404 if task not found / Повернути 404, якщо задача не знайдена
        }

        // Add new comment to the task's comments array / Додати новий коментар до масиву коментарів задачі
        task.comments.push({ text, user: req.user._id });
        await task.save(); // Save the updated task / Зберегти оновлену задачу

        // Record activity after successfully adding the comment / Записати активність після успішного додавання коментаря
        await Activity.create({
            user: req.user._id,
            action: 'added a comment',
            details: `Comment on task: ${task.title}`
        });

        res.status(201).json(task); // Return the updated task / Повернути оновлену задачу
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error }); // Handle and return error / Обробити та повернути помилку
    }
};

module.exports = { addCommentToTask };
