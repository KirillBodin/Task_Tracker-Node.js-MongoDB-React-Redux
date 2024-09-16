const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const Activity = require('../models/Activity'); // Import Activity model / Імпортуємо модель Activity
const Notification = require('../models/Notification');

// Get all projects / Отримання всіх проектів
const getProjects = asyncHandler(async (req, res) => {
    // Fetch projects with developer information / Отримуємо проекти з інформацією про розробників
    const projects = await Project.find().populate('developer', 'username');
    res.json(projects);
});

// Create a new project / Створення нового проекту
const createProject = asyncHandler(async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    // Create a new project with the provided data / Створюємо новий проект з наданими даними
    const project = new Project({
        title,
        description,
        startDate: new Date(startDate), // Convert string to date / Перетворюємо рядок у дату
        endDate: new Date(endDate)
    });
    const createdProject = await project.save();

    // Record activity after creating the project / Записуємо активність після створення проекту
    await Activity.create({
        user: req.user._id,
        action: 'created a project',
        details: `Project: ${createdProject.title}`
    });

    res.status(201).json(createdProject);
});

// Get tasks for a specific project / Отримання задач для конкретного проекту
const getProjectTasks = async (req, res) => {
    try {
        console.log("Received params:", req.params); // Log incoming parameters / Логування вхідних параметрів
        const tasks = await Task.find({ project: req.params.projectId }); // Fetch tasks by projectId / Отримання задач за projectId
        console.log("Fetched tasks:", tasks); // Log fetched tasks / Логування знайдених задач
        res.json(tasks); // Return fetched tasks / Повертаємо знайдені задачі
    } catch (error) {
        console.error("Error fetching project tasks:", error); // Log error / Логування помилки
        res.status(500).json({ message: 'Error fetching project tasks' }); // Return error response / Повернення відповіді з помилкою
    }
};

// Update a project / Оновлення проекту
const updateProject = asyncHandler(async (req, res) => {
    const { title, description, developerId, status } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = title || project.title; // Update title if provided / Оновлення назви, якщо надано
        project.description = description || project.description; // Update description if provided / Оновлення опису, якщо надано
        const previousStatus = project.status; // Save previous status / Зберігаємо попередній статус
        project.status = status || project.status; // Update status if provided / Оновлення статусу, якщо надано

        if (developerId) {
            const developer = await User.findById(developerId);
            if (developer) {
                project.developer = developer._id; // Assign developer if found / Призначення розробника, якщо знайдено
            }
        }

        const updatedProject = await project.save();

        // Record activity after updating the project / Записуємо активність після оновлення проекту
        await Activity.create({
            user: req.user._id,
            action: 'updated a project',
            details: `Project: ${updatedProject.title}`
        });

        // Send notification if project status changed to 'Done' / Надсилаємо сповіщення, якщо статус проекту змінюється на 'Завершено'
        if (previousStatus !== 'Done' && project.status === 'Done') {
            await Notification.create({
                user: project.owner, // Notify project owner / Сповіщення власника проекту
                message: `The project "${project.title}" has been marked as done.`, // Notification message / Повідомлення про завершення проекту
                read: false // Notification unread by default / Сповіщення не прочитано за замовчуванням
            });
        }

        res.json(updatedProject); // Return updated project / Повертаємо оновлений проект
    } else {
        res.status(404); // Project not found / Проект не знайдено
        throw new Error('Project not found');
    }
});

module.exports = { getProjects, createProject, getProjectTasks, updateProject };
