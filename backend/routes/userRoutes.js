const express = require('express'); // Імпортуємо express / Import express
const router = express.Router(); // Створюємо роутер / Create the router
const { protect, checkRole } = require('../middleware/authMiddleware'); // Імпортуємо middleware для перевірки автентифікації та ролей / Import middleware to check authentication and roles
const { getUsers, getUserProfile, updateUserProfile } = require('../controllers/userController');
const multer = require('multer'); // Імпортуємо multer для завантаження файлів / Import multer for file uploads
const path = require('path'); // Імпортуємо path для роботи з шляхами файлів / Import path for handling file paths

// Конфігурація збереження файлів / File storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Вказуємо шлях для збереження файлів / Set the destination folder
    },
    filename: function (req, file, cb) {
        // Створюємо ім'я файлу, додаючи час для унікальності / Create a unique filename by adding a timestamp
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Перевірка типу файлу / File type validation
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/; // Дозволені типи файлів / Allowed file types
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true); // Дозволяємо завантаження / Allow upload
    } else {
        cb('Error: Images Only!'); // Відхиляємо файл, якщо він не є зображенням / Reject file if not an image
    }
};

// Налаштування Multer для завантаження зображень / Configure Multer for image uploads
const upload = multer({ dest: 'uploads/' }); // Вказуємо шлях для завантаження / Set upload destination

// Маршрут для отримання списку користувачів (тільки для адміністраторів) / Route to get the list of users (admin only)
router.get('/', protect, checkRole(['admin']), getUsers);

// Маршрут для оновлення профілю користувача з можливістю завантаження зображення / Route to update user profile with image upload
router.put('/profile', protect, upload.single('profilePicture'), updateUserProfile);

// Маршрут для отримання та оновлення профілю користувача / Route for getting and updating user profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router; // Експортуємо роутер / Export the router
