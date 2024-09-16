const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const Activity = require('../models/Activity'); // Import Activity model / Імпорт моделі Activity
const Notification = require('../models/Notification');

// Get all tasks / Отримання всіх задач
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().populate('project', 'title'); // Fetch tasks with project information / Отримання задач з інформацією про проект

    // Record activity after fetching all tasks / Записуємо активність після отримання всіх задач
    await Activity.create({
        user: req.user._id,
        action: 'retrieved all tasks',
        details: `Fetched ${tasks.length} tasks.`,
    });

    res.json(tasks); // Send tasks as response / Надіслати задачі у відповіді
});

// Create a new task / Створення нової задачі
const createTask = asyncHandler(async (req, res) => {
    const { title, description, project } = req.body;
    const task = new Task({ title, description, project }); // Create new task / Створити нову задачу
    const createdTask = await task.save(); // Save the new task / Зберегти нову задачу

    // Record activity after creating a task / Записуємо активність після створення задачі
    await Activity.create({
        user: req.user._id,
        action: 'created a task',
        details: `Created task with title: ${createdTask.title}`,
    });

    res.status(201).json(createdTask); // Send created task as response / Надіслати створену задачу у відповіді
});

// Update a task / Оновлення задачі
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const { title, description, project, status, startDate, endDate, timeSpent, assignedTo } = req.body;

    const task = await Task.findById(taskId);

    if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        task.project = project || task.project;
        task.status = status || task.status;
        task.startDate = startDate || task.startDate;
        task.endDate = endDate || task.endDate;
        task.timeSpent = timeSpent || task.timeSpent;
        task.assignedTo = assignedTo || task.assignedTo;

        // Save updated task / Зберегти оновлену задачу
        const updatedTask = await task.save();

        // Record activity after updating a task / Записуємо активність після оновлення задачі
        await Activity.create({
            user: req.user._id,
            action: 'updated a task',
            details: `Updated task with title: ${updatedTask.title}, new status: ${updatedTask.status}`,
        });

        res.json(updatedTask); // Send updated task as response / Надіслати оновлену задачу у відповіді
    } else {
        res.status(404).json({ message: 'Task not found' }); // Task not found / Задачу не знайдено
    }
});

// Get task by ID / Отримання задачі за ID
const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate('project', 'title'); // Fetch task by ID with project information / Отримання задачі за ID з інформацією про проект

    if (task) {
        // Record activity after fetching the task by ID / Записуємо активність після отримання задачі за ID
        await Activity.create({
            user: req.user._id,
            action: 'retrieved a task by ID',
            details: `Fetched task with title: ${task.title}`,
        });

        res.json(task); // Send task as response / Надіслати задачу у відповіді
    } else {
        res.status(404).json({ message: 'Task not found' }); // Task not found / Задачу не знайдено
    }
});

module.exports = { getTasks, createTask, updateTask, getTaskById };
