const express = require('express'); // Імпортуємо express / Import express
const router = express.Router(); // Створюємо роутер / Create the router
const { protect, checkRole } = require('../middleware/authMiddleware'); // Імпортуємо middleware для перевірки автентифікації та ролей / Import middleware to check authentication and roles
const { getProjects, createProject, updateProject, deleteProject, getProjectTasks } = require('../controllers/projectController');

// Маршрут для отримання проектів / Route to get projects
router.route('/').get(protect, checkRole(['client', 'developer', 'admin']), getProjects);

// Маршрути для створення, оновлення та видалення проектів / Routes to create, update, and delete projects
router.route('/').post(protect, checkRole(['admin']), createProject);
router.route('/:id').put(protect, checkRole(['developer', 'admin']), updateProject);
router.route('/:id').delete(protect, checkRole(['admin']), deleteProject);

// Новий маршрут для отримання задач конкретного проекту / New route to get tasks for a specific project
router.route('/:projectId/tasks').get(protect, checkRole(['client', 'developer', 'admin']), getProjectTasks);

module.exports = router; // Експортуємо роутер / Export the router
