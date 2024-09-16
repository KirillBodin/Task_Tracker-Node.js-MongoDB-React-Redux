import React, { useState } from 'react'; // Import React and useState hook / Імпорт React та хук useState
import { TextField, Button, Box, Alert, Typography, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import axios from 'axios'; // Import axios for making HTTP requests / Імпорт axios для виконання HTTP-запитів
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation / Імпорт хука useNavigate для навігації

// Component for user registration form / Компонент форми реєстрації користувача
const RegisterForm = ({ setIsAuthenticated }) => {
    // Local state variables for username, password, error, and success message / Локальні змінні стану для імені користувача, пароля, помилки та повідомлення про успіх
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Hook for navigating to different routes / Хук для навігації по різним маршрутам

    // Handler for registration button click / Обробник натискання кнопки реєстрації
    const onRegisterClicked = async () => {
        try {
            // Make POST request to register the user / Виконуємо POST-запит для реєстрації користувача
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            setSuccess('Registration successful!'); // Set success message / Встановлюємо повідомлення про успіх
            setError(null); // Clear any previous errors / Очищуємо попередні помилки
            setUsername(''); // Clear username field / Очищуємо поле імені користувача
            setPassword(''); // Clear password field / Очищуємо поле пароля
            localStorage.setItem('token', response.data.token); // Save token to local storage / Зберігаємо токен у локальне сховище
            setIsAuthenticated(true); // Set authentication status to true / Встановлюємо статус автентифікації як true
            navigate('/home'); // Navigate to home page / Переходимо на головну сторінку
        } catch (err) {
            // Set error message if registration fails / Встановлюємо повідомлення про помилку, якщо реєстрація не вдалася
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
            setSuccess(null); // Clear success message / Очищуємо повідомлення про успіх
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
                    Register
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} {/* Display error message if present / Відображаємо повідомлення про помилку, якщо воно є */}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>} {/* Display success message if present / Відображаємо повідомлення про успіх, якщо воно є */}
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state / Оновлюємо стан імені користувача
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#1976d2' },
                            '&:hover fieldset': { borderColor: '#1565c0' },
                            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                        },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state / Оновлюємо стан пароля
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#1976d2' },
                            '&:hover fieldset': { borderColor: '#1565c0' },
                            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onRegisterClicked} // Call onRegisterClicked function / Викликаємо функцію onRegisterClicked
                    fullWidth
                    sx={{
                        marginTop: '1rem',
                        padding: '10px',
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#1565c0' },
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                >
                    Register
                </Button>
            </Paper>
        </Box>
    );
};

export default RegisterForm; // Export the component / Експортуємо компонент
