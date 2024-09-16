const mongoose = require('mongoose'); // Import mongoose / Импортируем mongoose
const colors = require('colors'); // Import colors for colored logging / Импортируем colors для цветного форматирования логов

const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables / Подключаемся к MongoDB, используя URI из переменных окружения
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Log successful connection with colored formatting / Лог успешного подключения с цветным форматированием
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        // Log connection error with colored formatting / Лог ошибки подключения с цветным форматированием
        console.error(`Error: ${error.message}`.red.underline);
        // Exit process with failure / Завершаем процесс с ошибкой
        process.exit(1);
    }
};

module.exports = connectDB; // Export the connectDB function / Экспортируем функцию connectDB
