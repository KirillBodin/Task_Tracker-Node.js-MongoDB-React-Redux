const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Импорт моделей
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Activity = require('./models/Activity');
const Comment = require('./models/Comment');
const Notification = require('./models/Notification');

dotenv.config(); // Загрузка переменных окружения

// Функция для очистки базы данных
const clearDatabase = async () => {
    try {
        // Подключение к базе данных
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Очистка всех коллекций
        await User.deleteMany({});
        await Project.deleteMany({});
        await Task.deleteMany({});
        await Activity.deleteMany({});
        await Comment.deleteMany({});
        await Notification.deleteMany({});

        console.log('All collections have been cleared');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Запуск скрипта
clearDatabase();
