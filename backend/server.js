const express = require('express'); // Імпортуємо express / Import express
const dotenv = require('dotenv'); // Імпортуємо dotenv для роботи зі змінними середовища / Import dotenv to handle environment variables
const cors = require('cors'); // Імпортуємо cors для обробки CORS-запитів / Import cors to handle CORS requests
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); // Імпортуємо middleware для обробки помилок / Import error handling middleware
const connectDB = require('./config/db'); // Імпортуємо функцію підключення до бази даних / Import database connection function
const path = require('path'); // Імпортуємо модуль path для роботи зі шляхами у файловій системі / Import path module for working with file system paths

dotenv.config(); // Завантажуємо змінні середовища / Load environment variables

connectDB(); // Підключаємося до бази даних / Connect to the database

const app = express(); // Створюємо екземпляр програми express / Create an express application instance

app.use(cors()); // Використовуємо cors middleware / Use cors middleware
app.use(express.json()); // Middleware для парсингу JSON / Middleware to parse JSON

// Імпортуємо маршрути / Import routes
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const statsRoutes = require('./routes/statsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Використовуємо маршрути / Use routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reports', reportRoutes);

// Маршрут для реєстрації / Route for user registration
app.use('/api/auth', authRoutes);
app.use(cors()); // Використовуємо cors middleware / Use cors middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/activities', activityRoutes); // Використовуємо маршрути активності / Use activity routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);
app.use(notFound); // Middleware для обробки маршрутів, які не знайдено / Middleware to handle not found routes
app.use(errorHandler); // Middleware для обробки помилок / Middleware to handle errors

const PORT = process.env.PORT || 5000; // Встановлюємо порт / Set the port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Запускаємо сервер / Start the server
