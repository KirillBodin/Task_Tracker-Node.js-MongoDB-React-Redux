const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask, getTasksByStatus, getTaskById } = require('../controllers/taskController');
const { addCommentToTask } = require('../controllers/commentController');
const { startTaskTimer, stopTaskTimer, resetTaskTimer } = require('../controllers/timerController'); // Імпортуємо функції таймера / Import timer functions

// Маршрути для задач / Routes for tasks
router.route('/')
    .get(protect, checkRole(['client', 'developer', 'admin']), getTasks) // Отримати всі задачі / Get all tasks
    .post(protect, checkRole(['developer', 'admin']), createTask); // Створити нову задачу / Create a new task

// Отримати задачу за ID / Get a task by ID
router.get('/:id', protect, checkRole(['client', 'developer', 'admin']), getTaskById);

// Оновити або видалити задачу / Update or delete a task
router.route('/:id')
    .put(protect, checkRole(['developer', 'admin']), updateTask) // Оновити задачу / Update a task
    .delete(protect, checkRole(['admin']), deleteTask); // Видалити задачу / Delete a task

// Отримати задачі за статусом / Get tasks by status
router.get('/status/:status', protect, checkRole(['client', 'developer', 'admin']), getTasksByStatus);

// Додати коментар до задачі / Add a comment to a task
router.post('/:taskId/comments', protect, addCommentToTask);

// Маршрути для керування таймером задачі / Routes for managing task timer
router.route('/:taskId/start-timer').put(protect, startTaskTimer); // Запустити таймер задачі / Start the task timer
router.route('/:taskId/stop-timer').put(protect, stopTaskTimer); // Зупинити таймер задачі / Stop the task timer
router.route('/:taskId/reset-timer').put(protect, resetTaskTimer); // Скинути таймер задачі / Reset the task timer

module.exports = router; // Експортуємо роутер / Export the router
