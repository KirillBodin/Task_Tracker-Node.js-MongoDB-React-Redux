const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const Activity = require('../models/Activity'); // Import Activity model / Імпортуємо модель Activity
const Notification = require('../models/Notification');

// Get all tasks / Отримання всіх задач
const getTasks = asyncHandler(async (req, res) => {
    // Fetch tasks with project information / Отримуємо задачі з інформацією про проект
    const tasks = await Task.find().populate('project', 'title');

    // Record activity after fetching all tasks / Записуємо активність після отримання всіх задач
    await Activity.create({
        user: req.user._id,
        action: 'retrieved all tasks',
        details: `Fetched ${tasks.length} tasks.`,
    });

    res.json(tasks);
});

// Create a new task / Створення нової задачі
const createTask = asyncHandler(async (req, res) => {
    const { title, description, project } = req.body;

    // Create a new task instance / Створюємо новий екземпляр задачі
    const task = new Task({ title, description, project });
    const createdTask = await task.save();

    // Record activity after creating a task / Записуємо активність після створення задачі
    await Activity.create({
        user: req.user._id,
        action: 'created a task',
        details: `Created task with title: ${createdTask.title}`,
    });

    res.status(201).json(createdTask);
});

// Update a task / Оновлення задачі
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const { title, description, project, status, startDate, endDate, timeSpent, assignedTo } = req.body;

    // Find task by ID / Знаходимо задачу за ID
    const task = await Task.findById(taskId);

    if (task) {
        // Update task properties / Оновлюємо властивості задачі
        task.title = title || task.title;
        task.description = description || task.description;
        task.project = project || task.project;
        task.status = status || task.status;
        task.startDate = startDate || task.startDate;
        task.endDate = endDate || task.endDate;
        task.timeSpent = timeSpent || task.timeSpent;
        task.assignedTo = assignedTo || task.assignedTo;

        // Save the updated task / Зберігаємо оновлену задачу
        const updatedTask = await task.save();

        // Record activity after updating a task / Записуємо активність після оновлення задачі
        await Activity.create({
            user: req.user._id,
            action: 'updated a task',
            details: `Updated task with title: ${updatedTask.title}, new status: ${updatedTask.status}`,
        });

        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found'); // Задача не знайдена
    }
});

// Get task by ID / Отримання задачі за ID
const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.id;

    // Find task by ID and populate project information / Знаходимо задачу за ID та отримуємо інформацію про проект
    const task = await Task.findById(taskId).populate('project', 'title');

    if (task) {
        // Record activity after fetching the task by ID / Записуємо активність після отримання задачі за ID
        await Activity.create({
            user: req.user._id,
            action: 'retrieved a task by ID',
            details: `Fetched task with title: ${task.title}`,
        });

        res.json(task);
    } else {
        res.status(404);
        throw new Error('Task not found'); // Задача не знайдена
    }
});

// Get tasks by status / Отримання задач за статусом
const getTasksByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        let tasks;
        // By default, format status / За замовчуванням форматуємо статус
        let statusLabel = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

        if (status.toLowerCase() === 'all') {
            tasks = await Task.find().populate('project');
            statusLabel = 'All'; // Use "All" as the status / Використовуємо "All" як статус
        } else {
            const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
            tasks = await Task.find({ status: formattedStatus }).populate('project');
        }

        // Record activity after fetching tasks by status / Записуємо активність після отримання задач за статусом
        await Activity.create({
            user: req.user._id,
            action: 'retrieved tasks by status',
            details: `Fetched ${tasks.length} tasks with status: ${statusLabel}`,
        });

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks by status:', error); // Log error for debugging / Логування помилки для відладки
        res.status(500).json({
            message: 'Error fetching tasks by status',
            error: error.message || 'Unknown error', // Add error message / Додавання повідомлення про помилку
        });
    }
};

// Delete a task / Видалення задачі
const deleteTask = asyncHandler(async (req, res) => {
    // Find task by ID / Знаходимо задачу за ID
    const task = await Task.findById(req.params.id);

    if (task) {
        await task.remove();

        // Record activity after deleting a task / Записуємо активність після видалення задачі
        await Activity.create({
            user: req.user._id,
            action: 'deleted a task',
            details: `Deleted task with title: ${task.title}`,
        });

        res.json({ message: 'Task removed' });
    } else {
        res.status(404);
        throw new Error('Task not found'); // Задача не знайдена
    }
});

module.exports = { getTasks, createTask, updateTask, deleteTask, getTasksByStatus, getTaskById };
