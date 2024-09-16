const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Функция для генерации JWT токена
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Регистрация пользователя
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Проверка, существует ли пользователь
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Создание нового пользователя
        const user = await User.create({
            username,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Аутентификация пользователя
const authUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Находим пользователя по имени
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    authUser,
};
