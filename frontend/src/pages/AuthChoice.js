import React from 'react'; // Import React / Імпорт React
import { Button, Box, Typography, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { useNavigate } from 'react-router-dom'; // Import hook for navigation / Імпорт хука для навігації

const AuthChoice = () => {
    const navigate = useNavigate(); // Hook to navigate between routes / Хук для навігації між маршрутами

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default" // Center align content in the viewport with default background / Центруємо вміст у вікні перегляду з фоновим кольором за замовчуванням
        >
            <Paper
                elevation={4} // Set elevation to add shadow effect / Встановлюємо підняття для додавання ефекту тіні
                sx={{
                    padding: 4, // Padding around the content / Відступи навколо вмісту
                    maxWidth: 400, // Maximum width of the paper / Максимальна ширина компонента Paper
                    textAlign: 'center', // Center align text inside / Вирівнювання тексту по центру
                    borderRadius: '12px', // Rounded corners / Закруглені кути
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Box shadow styling / Стилізація тіні
                    bgcolor: 'background.paper', // Paper background color / Колір фону Paper
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom // Adds margin below the element / Додає відступ під елементом
                    sx={{ fontWeight: 'bold', color: '#1976d2' }} // Styling for the heading / Стилізація заголовку
                >
                    Welcome to Task Tracker {/* Heading text / Текст заголовку */}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ marginBottom: 3, color: 'text.secondary' }} // Styling for the subheading / Стилізація підзаголовку
                >
                    Please choose an option to continue {/* Instruction text / Текст інструкції */}
                </Typography>
                <Button
                    variant="contained"
                    color="primary" // Primary color for the button / Основний колір для кнопки
                    onClick={() => navigate('/login')} // Navigate to the login page on click / Перехід на сторінку входу при натисканні
                    fullWidth // Make button take the full width of the container / Робить кнопку на всю ширину контейнера
                    sx={{
                        marginBottom: 2, // Add margin below the button / Додає відступ під кнопкою
                        padding: '10px', // Padding inside the button / Відступи всередині кнопки
                        backgroundColor: '#1976d2', // Button background color / Колір фону кнопки
                        '&:hover': { backgroundColor: '#1565c0' }, // Hover effect for the button / Ефект при наведенні на кнопку
                        fontWeight: 'bold', // Bold text for the button / Жирний текст для кнопки
                        textTransform: 'none', // Prevent text from transforming to uppercase / Відключити перетворення тексту на верхній регістр
                    }}
                >
                    Login {/* Button text / Текст кнопки */}
                </Button>
                <Button
                    variant="contained"
                    color="secondary" // Secondary color for the button / Вторинний колір для кнопки
                    onClick={() => navigate('/register')} // Navigate to the registration page on click / Перехід на сторінку реєстрації при натисканні
                    fullWidth
                    sx={{
                        padding: '10px',
                        backgroundColor: '#dc004e', // Button background color / Колір фону кнопки
                        '&:hover': { backgroundColor: '#b71c1c' }, // Hover effect for the button / Ефект при наведенні на кнопку
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                >
                    Register {/* Button text / Текст кнопки */}
                </Button>
            </Paper>
        </Box>
    );
};

export default AuthChoice; // Export the AuthChoice component / Експорт компонента AuthChoice
