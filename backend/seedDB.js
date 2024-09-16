const mongoose = require('mongoose');
const dotenv = require('dotenv');
const argon2 = require('argon2');

// Импорт моделей
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Activity = require('./models/Activity');
const Comment = require('./models/Comment');
const Notification = require('./models/Notification');

dotenv.config(); // Загрузка переменных окружения

// Функция для очистки базы данных и заполнения её новыми данными
const seedDatabase = async () => {
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

        // Создание новых пользователей
        const hashedPassword = await argon2.hash('123456');
        const admin = new User({ username: 'admin', email: 'admin@example.com', password: hashedPassword, role: 'admin' });
        const developer = new User({ username: 'developer', email: 'developer@example.com', password: hashedPassword, role: 'developer' });
        const client = new User({ username: 'client', email: 'client@example.com', password: hashedPassword, role: 'client' });

        await admin.save();
        await developer.save();
        await client.save();

        console.log('Users created');

        // Создание новых проектов
        const project1 = new Project({
            title: 'Project Alpha',
            description: 'This is the first project.',
            developer: developer._id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Через 7 дней
        });

        const project2 = new Project({
            title: 'Project Beta',
            description: 'This is the second project.',
            developer: developer._id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Через 14 дней
        });

        await project1.save();
        await project2.save();

        console.log('Projects created');

        // Создание новых задач
        const task1 = new Task({
            title: 'Task 1',
            description: 'This is the first task.',
            project: project1._id,
            status: 'Backlog',
            startDate: new Date(),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Через 2 дня
            assignedTo: developer._id,
        });

        const task2 = new Task({
            title: 'Task 2',
            description: 'This is the second task.',
            project: project1._id,
            status: 'In Progress',
            startDate: new Date(),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Через 3 дня
            assignedTo: developer._id,
        });

        const task3 = new Task({
            title: 'Task 3',
            description: 'This is the third task.',
            project: project2._id,
            status: 'Review',
            startDate: new Date(),
            endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // Через 4 дня
            assignedTo: developer._id,
        });

        await task1.save();
        await task2.save();
        await task3.save();

        console.log('Tasks created');

        // Создание новой активности
        const activity1 = new Activity({
            user: admin._id,
            action: 'Created a new project',
            details: `Project ${project1.title} created.`,
        });

        const activity2 = new Activity({
            user: developer._id,
            action: 'Started a new task',
            details: `Task ${task1.title} started.`,
        });

        await activity1.save();
        await activity2.save();

        console.log('Activities created');

        // Создание новых комментариев
        const comment1 = new Comment({
            user: developer._id,
            task: task1._id,
            text: 'This is a comment on Task 1.',
        });

        const comment2 = new Comment({
            user: client._id,
            task: task2._id,
            text: 'This is a comment on Task 2.',
        });

        await comment1.save();
        await comment2.save();

        console.log('Comments created');

        // Создание новых уведомлений
        const notification1 = new Notification({
            user: developer._id,
            message: 'You have been assigned to Task 1.',
        });

        const notification2 = new Notification({
            user: developer._id,
            message: 'Task 2 is now in progress.',
        });

        await notification1.save();
        await notification2.save();

        console.log('Notifications created');

        console.log('Database seeding completed successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Запуск скрипта
seedDatabase();
