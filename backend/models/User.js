const mongoose = require('mongoose'); // Імпортуємо mongoose для роботи з MongoDB / Import mongoose for MongoDB
const argon2 = require('argon2'); // Імпортуємо argon2 для хешування паролів / Import argon2 for password hashing

// Визначення схеми користувача / User schema definition
const userSchema = mongoose.Schema({
    username: {
        type: String, // Тип даних - рядок / Data type - string
        required: true, // Обов'язкове поле / Required field
        unique: true, // Унікальне значення / Unique value
    },
    email: {
        type: String, // Тип даних - рядок / Data type - string
        required: true, // Обов'язкове поле / Required field
        unique: true, // Унікальне значення / Unique value
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Валідація email / Email validation
    },
    password: {
        type: String, // Тип даних - рядок / Data type - string
        required: true, // Обов'язкове поле / Required field
    },
    role: {
        type: String, // Тип даних - рядок / Data type - string
        enum: ['client', 'developer', 'admin'], // Дозволені значення для ролей / Allowed role values
        default: 'client', // Значення за замовчуванням - клієнт / Default value - client
    },
    profilePicture: {
        type: String, // Тип даних - рядок (посилання на зображення) / Data type - string (image URL)
        default: '', // Значення за замовчуванням - порожнє / Default value - empty
    },
}, {
    timestamps: true, // Додає часові мітки створення та оновлення / Adds creation and update timestamps
});

// Метод для хешування пароля перед збереженням / Method to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { // Якщо пароль не змінювався, переходимо до наступного middleware / If password not modified, proceed to next middleware
        return next();
    }
    try {
        // Хешуємо пароль за допомогою argon2 / Hash the password using argon2
        this.password = await argon2.hash(this.password);
        next();
    } catch (error) {
        next(error); // Передаємо помилку далі, якщо хешування не вдалося / Pass error if hashing fails
    }
});

// Метод для перевірки пароля / Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
    try {
        // Порівнюємо введений пароль з хешованим паролем / Compare entered password with hashed password
        return await argon2.verify(this.password, enteredPassword);
    } catch (error) {
        return false; // Повертаємо false, якщо перевірка не вдалася / Return false if check fails
    }
};

const User = mongoose.model('User', userSchema); // Створюємо модель користувача на основі схеми / Create user model based on schema

module.exports = User; // Експортуємо модель користувача / Export the user model
