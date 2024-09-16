import React, { useState } from 'react'; // Import React and useState hook / Імпорт React та хука useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation / Імпорт useNavigate для навігації
import axios from 'axios'; // Import axios for HTTP requests / Імпорт axios для HTTP-запитів
import { Box, TextField, Button, Typography, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI

// LoginForm component for handling user login / Компонент LoginForm для обробки логіна користувача
const LoginForm = ({ setIsAuthenticated }) => {
    // Local state for username, password, and error message / Локальний стан для імені користувача, пароля та повідомлення про помилку
    const [username, setUsername] = useState(''); // State for storing username / Стан для збереження імені користувача
    const [password, setPassword] = useState(''); // State for storing password / Стан для збереження пароля
    const [error, setError] = useState(null); // State for error message / Стан для повідомлення про помилку
    const navigate = useNavigate(); // Hook for navigation / Хук для навігації

    // Function to handle login form submission / Функція для обробки надсилання форми логіна
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission / Запобігаємо стандартному надсиланню форми
        try {
            // Send a POST request to the login endpoint / Відправляємо POST-запит до ендпоінту логіна
            const response = await axios.post('/api/auth/login', { username, password });
            // Store the token in local storage / Зберігаємо токен в локальному сховищі
            localStorage.setItem('token', response.data.token);

            // Set the token in axios default headers / Встановлюємо токен в заголовки за замовчуванням axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            setIsAuthenticated(true); // Update authentication state / Оновлюємо стан автентифікації
            navigate('/dashboard'); // Navigate to the dashboard page / Перехід на сторінку панелі керування
        } catch (error) {
            // Set error message if login fails / Встановлюємо повідомлення про помилку, якщо логін не вдався
            setError('Invalid username or password');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: '2rem',
                    maxWidth: '400px',
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Login {/* Title of the form / Назва форми */}
                </Typography>
                <form onSubmit={handleLogin}> {/* Form element to handle submission / Елемент форми для обробки надсилання */}
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username} // Bind state to input value / Зв'язуємо стан з значенням введення
                        onChange={(e) => setUsername(e.target.value)} // Update state on input change / Оновлюємо стан при зміні введення
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1976d2' }, // Set default border color / Встановлюємо стандартний колір рамки
                                '&:hover fieldset': { borderColor: '#1565c0' }, // Set border color on hover / Встановлюємо колір рамки при наведенні
                                '&.Mui-focused fieldset': { borderColor: '#1976d2' }, // Set border color when focused / Встановлюємо колір рамки при фокусі
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password" // Set input type to password / Встановлюємо тип введення як пароль
                        fullWidth
                        margin="normal"
                        value={password} // Bind state to input value / Зв'язуємо стан з значенням введення
                        onChange={(e) => setPassword(e.target.value)} // Update state on input change / Оновлюємо стан при зміні введення
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1976d2' }, // Set default border color / Встановлюємо стандартний колір рамки
                                '&:hover fieldset': { borderColor: '#1565c0' }, // Set border color on hover / Встановлюємо колір рамки при наведенні
                                '&.Mui-focused fieldset': { borderColor: '#1976d2' }, // Set border color when focused / Встановлюємо колір рамки при фокусі
                            },
                        }}
                    />
                    {error && ( // Display error message if present / Відображаємо повідомлення про помилку, якщо воно є
                        <Typography color="error" variant="body2" align="center" sx={{ marginBottom: '1rem' }}>
                            {error} {/* Display error text / Відображення тексту помилки */}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            marginTop: '1rem',
                            backgroundColor: '#1976d2', // Set button color / Встановлюємо колір кнопки
                            '&:hover': { backgroundColor: '#1565c0' }, // Set hover color / Встановлюємо колір при наведенні
                            padding: '10px',
                            borderRadius: '8px',
                            textTransform: 'none', // Disable uppercase transformation / Вимикаємо перетворення в верхній регістр
                            fontWeight: 'bold',
                        }}
                    >
                        Login {/* Button text / Текст кнопки */}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginForm; // Export LoginForm component / Експорт компонента LoginForm
