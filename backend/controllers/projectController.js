const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const Activity = require('../models/Activity'); // Import Activity model / Імпортуємо модель Activity
const Notification = require('../models/Notification');

// Get all projects / Отримання списку проектів
const getProjects = asyncHandler(async (req, res) => {
    // Fetch projects with developer information / Отримуємо проекти з інформацією про розробників
    const projects = await Project.find().populate('developer', 'username');
    res.json(projects);
});

// Create a new project / Створення нового проекту
const createProject = asyncHandler(async (req, res) => {
    const { title, description, startDate, endDate } = req.body;

    // Create a new project instance, converting strings to dates / Створюємо новий екземпляр проекту, перетворюючи рядки в дати
    const project = new Project({
        title,
        description,
        startDate: new Date(startDate),
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

// Get tasks for a specific project / Отримання задач конкретного проекту
const getProjectTasks = async (req, res) => {
    try {
        console.log("Received params:", req.params); // Log input data / Логування вхідних даних

        // Fetch tasks by projectId / Запит на отримання задач по projectId
        const tasks = await Task.find({ project: req.params.projectId });
        console.log("Fetched tasks:", tasks); // Log fetched tasks / Логування знайдених задач

        res.json(tasks); // Return fetched tasks / Повертаємо знайдені задачі
    } catch (error) {
        console.error("Error fetching project tasks:", error); // Log error / Логування помилки
        res.status(500).json({ message: 'Error fetching project tasks' });
    }
};

// Update a project / Оновлення проекту
const updateProject = asyncHandler(async (req, res) => {
    const { title, description, developerId, status } = req.body;

    // Find project by ID / Знаходимо проект за ID
    const project = await Project.findById(req.params.id);

    if (project) {
        // Update project properties / Оновлюємо властивості проекту
        project.title = title || project.title;
        project.description = description || project.description;
        const previousStatus = project.status;
        project.status = status || project.status;

        if (developerId) {
            // Find developer by ID / Знаходимо розробника за ID
            const developer = await User.findById(developerId);
            if (developer) {
                project.developer = developer._id; // Assign developer / Призначаємо розробника
            }
        }

        const updatedProject = await project.save();

        // Record activity after updating the project / Записуємо активність після оновлення проекту
        await Activity.create({
            user: req.user._id,
            action: 'updated a project',
            details: `Project: ${updatedProject.title}`
        });

        // Send notification if the project was completed / Відправляємо повідомлення, якщо проект був завершений
        if (previousStatus !== 'Done' && project.status === 'Done') {
            await Notification.create({
                user: project.owner, // Assume the project has an owner field for the responsible user / Припустимо, що у проекту є поле owner для відповідального користувача
                message: `Project "${project.title}" has been completed.`,
            });
        }

        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found'); // Проект не знайдено
    }
});

// Delete a project / Видалення проекту
const deleteProject = asyncHandler(async (req, res) => {
    // Find project by ID / Знаходимо проект за ID
    const project = await Project.findById(req.params.id);

    if (project) {
        await project.remove();

        // Record activity after deleting the project / Записуємо активність після видалення проекту
        await Activity.create({
            user: req.user._id,
            action: 'deleted a project',
            details: `Project: ${project.title}`
        });

        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found'); // Проект не знайдено
    }
});

module.exports = { getProjects, createProject, updateProject, deleteProject, getProjectTasks };
