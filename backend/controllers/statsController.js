const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Activity = require('../models/Activity'); // Import Activity model / Імпорт моделі Activity

// Get statistics / Отримання статистики
const getStats = asyncHandler(async (req, res) => {
    const totalProjects = await Project.countDocuments({}); // Count total projects / Підрахунок загальної кількості проектів
    const totalTasks = await Task.countDocuments({}); // Count total tasks / Підрахунок загальної кількості задач
    const completedTasks = await Task.countDocuments({ status: 'Done' }); // Count completed tasks / Підрахунок завершених задач
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress' }); // Count in-progress tasks / Підрахунок задач в процесі

    // Record activity after fetching statistics / Записуємо активність після отримання статистики
    await Activity.create({
        user: req.user._id,
        action: 'retrieved statistics',
        details: `Statistics retrieved: ${totalProjects} projects, ${totalTasks} tasks, ${completedTasks} completed tasks, ${inProgressTasks} in-progress tasks.`
    });

    res.json({
        totalProjects,
        totalTasks,
        completedTasks,
        inProgressTasks,
    }); // Send statistics as response / Надіслати статистику у відповіді
});

module.exports = { getStats };
