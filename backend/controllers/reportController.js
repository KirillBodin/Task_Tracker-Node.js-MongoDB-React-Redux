const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const Activity = require('../models/Activity');

// Get project status report / Отримання звіту про статус проектів
const getProjectStatusReport = asyncHandler(async (req, res) => {
    // Fetch all projects from the database / Отримання всіх проектів з бази даних
    const projects = await Project.find({});

    // Generate report data for each project / Генерація даних звіту для кожного проекту
    const reportData = await Promise.all(projects.map(async project => {
        // Find tasks associated with the project / Знайти задачі, пов'язані з проектом
        const tasks = await Task.find({ project: project._id });
        const tasksCount = tasks.length; // Count the number of tasks / Підрахунок кількості задач

        // Find developers assigned to the tasks / Знайти розробників, призначених на задачі
        const developers = await User.find({ role: 'developer', _id: { $in: tasks.map(task => task.assignedTo) } });
        const developersCount = developers.length; // Count the number of developers / Підрахунок кількості розробників

        // Count the total number of comments on tasks / Підрахунок загальної кількості коментарів до задач
        const commentsCount = tasks.reduce((total, task) => total + task.comments.length, 0);

        // Calculate the total time spent on the project based on tasks / Розрахунок загального часу, витраченого на проект на основі задач
        const timeSpent = calculateTimeSpentOnProject(tasks);

        // Return the report data for the project / Повертаємо дані звіту для проекту
        return {
            title: project.title, // Project title / Назва проекту
            status: project.status, // Project status / Статус проекту
            startDate: project.startDate, // Start date of the project / Дата початку проекту
            endDate: project.endDate, // End date of the project / Дата закінчення проекту
            developersCount, // Number of developers assigned to tasks / Кількість розробників, призначених на задачі
            tasksCount, // Total number of tasks / Загальна кількість задач
            timeSpent, // Total time spent on the project / Загальний час, витрачений на проект
            commentsCount // Total number of comments on tasks / Загальна кількість коментарів до задач
        };
    }));

    // Record the activity of generating the report / Записуємо активність створення звіту
    await Activity.create({
        user: req.user._id,
        action: 'Generated Project Status Report',
        details: `User ${req.user.username} generated a report on project statuses.`,
        timestamp: new Date(), // Timestamp of when the report was generated / Часовий штамп створення звіту
    });

    // Send the report data as JSON response / Надіслати дані звіту у відповіді JSON
    res.json(reportData);
});

// Function to calculate time spent on a project based on tasks / Функція для розрахунку часу, витраченого на проект, на основі задач
const calculateTimeSpentOnProject = (tasks) => {
    let totalTime = 0; // Initialize total time spent / Ініціалізуємо загальний витрачений час
    tasks.forEach(task => {
        if (task.timeSpent) {
            totalTime += task.timeSpent; // Add time spent on each task / Додаємо час, витрачений на кожну задачу
        }
    });
    return totalTime; // Return the total time spent / Повертаємо загальний витрачений час
};

// Get task completion report / Отримання звіту про завершення задач
const getTaskCompletionReport = asyncHandler(async (req, res) => {
    // Fetch all tasks from the database / Отримання всіх задач з бази даних
    const tasks = await Task.find({});

    // Generate report data for each task / Генерація даних звіту для кожної задачі
    const reportData = tasks.map(task => ({
        title: task.title, // Task title / Назва задачі
        project: task.project ? task.project.title : 'N/A', // Include project title or 'N/A' if not applicable / Включити назву проекту або 'N/A', якщо не застосовується
        status: task.status, // Task status / Статус задачі
        startDate: task.startDate, // Start date of the task / Дата початку задачі
        endDate: task.endDate, // End date of the task / Дата закінчення задачі
        duration: task.timeSpent, // Time spent on the task / Час, витрачений на задачу
        commentsCount: task.comments.length // Number of comments on the task / Кількість коментарів до задачі
    }));

    // Record the activity of generating the report / Записуємо активність створення звіту
    await Activity.create({
        user: req.user._id,
        action: 'Generated Task Completion Report',
        details: `User ${req.user.username} generated a report on task completions.`,
        timestamp: new Date(), // Timestamp of when the report was generated / Часовий штамп створення звіту
    });

    // Send the report data as JSON response / Надіслати дані звіту у відповіді JSON
    res.json(reportData);
});

module.exports = { getProjectStatusReport, getTaskCompletionReport };
