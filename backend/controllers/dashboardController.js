const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Task = require('../models/Task');

// Get dashboard analytics / Отримання аналітики для дашборда
const getDashboardAnalytics = asyncHandler(async (req, res) => {
    // Count total number of projects / Підрахунок загальної кількості проектів
    const totalProjects = await Project.countDocuments({});
    // Count total number of tasks / Підрахунок загальної кількості завдань
    const totalTasks = await Task.countDocuments({});
    // Count number of completed tasks / Підрахунок кількості завершених завдань
    const completedTasks = await Task.countDocuments({ status: 'Done' });
    // Count number of tasks in progress / Підрахунок кількості завдань у процесі
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });

    // Calculate completion percentage / Обчислюємо відсоток завершених завдань
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Return analytics data / Повертаємо дані аналітики
    res.json({
        totalProjects,
        totalTasks,
        completedTasks,
        inProgressTasks,
        completionPercentage,
    });
});

module.exports = { getDashboardAnalytics };
