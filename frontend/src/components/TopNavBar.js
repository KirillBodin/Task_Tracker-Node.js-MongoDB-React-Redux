import React, { useContext, useState } from 'react'; // Import React and hooks for state and context management / Імпорт React та хуків для управління станом і контекстом
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, ButtonBase, Box } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { ThemeContext } from '../theme/ThemeContext'; // Import custom ThemeContext for theme toggling / Імпорт кастомного ThemeContext для перемикання теми
import { useNavigate } from 'react-router-dom'; // Import hook for navigation / Імпорт хука для навігації
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import icon for notifications / Імпорт іконки для сповіщень
import NotificationList from './NotificationList'; // Import NotificationList component / Імпорт компонента NotificationList

const TopNavBar = ({ onLogout }) => { // TopNavBar component for the top navigation bar / Компонент TopNavBar для верхньої панелі навігації
    const { theme, toggleTheme } = useContext(ThemeContext); // Use context to get current theme and toggle function / Використовуємо контекст для отримання поточної теми та функції перемикання
    const navigate = useNavigate(); // Hook to navigate between routes / Хук для навігації між маршрутами
    const [anchorEl, setAnchorEl] = useState(null); // State to manage the anchor element for the menu / Стан для управління прив'язкою елемента меню

    // Handle notification button click / Обробник кліку кнопки сповіщень
    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget); // Set anchor element for the menu / Встановлюємо прив'язку для елемента меню
    };

    // Close the notification menu / Закрити меню сповіщень
    const handleNotificationClose = () => {
        setAnchorEl(null); // Clear the anchor element / Очищуємо прив'язку елемента
    };

    // Handle logout / Обробник виходу з системи
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage / Видаляємо токен з локального сховища
        onLogout(); // Call onLogout prop function / Викликаємо функцію onLogout
        navigate('/auth'); // Redirect to authentication page / Перенаправляємо на сторінку аутентифікації
    };

    return (
        <AppBar
            position="relative" // Position the AppBar relative to its parent / Встановлюємо AppBar відносно його батьківського елемента
            sx={{
                width: '100%',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Apply gradient background / Застосовуємо градієнтний фон
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Add shadow effect / Додаємо ефект тіні
            }}
        >
            <Toolbar>
                <ButtonBase
                    onClick={() => navigate('/dashboard')} // Navigate to the dashboard on click / Перенаправляємо на панель інструментів при кліку
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.1)', // Scale up on hover / Збільшуємо при наведенні
                            transition: 'transform 0.3s ease', // Smooth transition / Плавний перехід
                        },
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'Poppins', // Set custom font / Встановлюємо власний шрифт
                            letterSpacing: '0.1em', // Add letter spacing / Додаємо міжбуквенний інтервал
                            color: 'inherit', // Inherit color from parent / Наслідуємо колір від батьківського елемента
                        }}
                    >
                        Task Tracker {/* Display the app name / Відображаємо назву додатку */}
                    </Typography>
                </ButtonBase>
                <Box sx={{ flexGrow: 1 }} /> {/* Empty box to push the rest of the items to the right / Порожній блок для зміщення решти елементів праворуч */}
                <IconButton
                    color="inherit"
                    onClick={handleNotificationClick} // Open the notification menu on click / Відкриваємо меню сповіщень при кліку
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.2)', // Scale up on hover / Збільшуємо при наведенні
                            transition: 'transform 0.3s ease', // Smooth transition / Плавний перехід
                        },
                    }}
                >
                    <NotificationsIcon /> {/* Notification icon / Іконка сповіщень */}
                </IconButton>
                <Menu
                    anchorEl={anchorEl} // Anchor element for the menu / Прив'язка елемента для меню
                    open={Boolean(anchorEl)} // Open the menu if anchorEl is set / Відкриваємо меню, якщо anchorEl встановлено
                    onClose={handleNotificationClose} // Close the menu / Закрити меню
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: theme === 'light' ? '#fff' : '#333', // Set menu background color based on theme / Встановлюємо колір фону меню в залежності від теми
                            color: theme === 'light' ? '#000' : '#fff', // Set menu text color based on theme / Встановлюємо колір тексту меню в залежності від теми
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Add shadow effect / Додаємо ефект тіні
                            borderRadius: '8px', // Round corners of the menu / Закруглюємо кути меню
                        },
                    }}
                >
                    <MenuItem onClick={handleNotificationClose}>
                        <NotificationList /> {/* Display the list of notifications / Відображаємо список сповіщень */}
                    </MenuItem>
                </Menu>
                <Button
                    color="inherit"
                    onClick={toggleTheme} // Toggle the theme / Перемикання теми
                    sx={{
                        '&:hover': {
                            color: '#FE6B8B', // Change color on hover / Змінюємо колір при наведенні
                            transition: 'color 0.3s ease', // Smooth transition / Плавний перехід
                        },
                    }}
                >
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'} {/* Display text based on current theme / Відображення тексту на основі поточної теми */}
                </Button>
                <Button
                    color="inherit"
                    onClick={() => navigate('/profile')} // Navigate to the profile page / Перенаправляємо на сторінку профілю
                    sx={{
                        '&:hover': {
                            color: '#FE6B8B', // Change color on hover / Змінюємо колір при наведенні
                            transition: 'color 0.3s ease', // Smooth transition / Плавний перехід
                        },
                    }}
                >
                    My Profile {/* Button to navigate to the user's profile / Кнопка для переходу до профілю користувача */}
                </Button>
                <Button
                    color="inherit"
                    onClick={handleLogout} // Log out the user / Вихід з системи
                    sx={{
                        '&:hover': {
                            color: '#FE6B8B', // Change color on hover / Змінюємо колір при наведенні
                            transition: 'color 0.3s ease', // Smooth transition / Плавний перехід
                        },
                    }}
                >
                    Logout {/* Button to log out / Кнопка для виходу з системи */}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default TopNavBar; // Export TopNavBar component / Експорт компонента TopNavBar
