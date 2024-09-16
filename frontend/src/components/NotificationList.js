import React, { useEffect } from 'react'; // Import React and useEffect for lifecycle management / Імпорт React та useEffect для керування життєвим циклом
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for interacting with Redux store / Імпорт хуків для взаємодії зі store Redux
import { fetchNotifications, markNotificationAsRead } from '../redux/notificationSlice'; // Import actions for notifications / Імпорт дій для сповіщень
import { Box, Typography, Button, Paper, IconButton } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Import icon for marking as read / Імпорт іконки для позначення як прочитано
import FiberNewIcon from '@mui/icons-material/FiberNew'; // Import icon for new notification / Імпорт іконки для нового сповіщення

const NotificationList = () => {
    const dispatch = useDispatch(); // Hook to dispatch actions to store / Хук для відправлення дій до store
    const notifications = useSelector(state => state.notifications.items); // Select notifications from store / Отримання сповіщень зі store

    useEffect(() => {
        dispatch(fetchNotifications()); // Fetch notifications on component mount / Отримати сповіщення при монтуванні компонента
    }, [dispatch]); // Dependency array to run only on mount / Масив залежностей для виконання лише при монтуванні

    // Check if there are no notifications to display
    // Перевірка, чи немає сповіщень для відображення
    if (!notifications || notifications.length === 0) {
        return <Typography>No notifications found.</Typography>; // Display message if no notifications / Відобразити повідомлення, якщо сповіщення відсутні
    }

    return (
        <Box sx={{ padding: 3 }}> {/* Container for the notification list / Контейнер для списку сповіщень */}
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center', // Center the text / Вирівнювання тексту по центру
                    color: '#3f51b5', // Set the color / Встановлення кольору
                    fontWeight: 'bold', // Bold font weight / Жирний шрифт
                }}
            >
                Notifications {/* Section title / Заголовок секції */}
            </Typography>
            {notifications.map(notification => ( // Iterate through notifications / Перебір сповіщень
                <Paper
                    key={notification._id} // Unique key for each notification / Унікальний ключ для кожного сповіщення
                    sx={{
                        display: 'flex', // Flexbox for layout / Flexbox для макету
                        alignItems: 'center', // Center items vertically / Вирівнювання елементів вертикально
                        justifyContent: 'space-between', // Space between items / Розташування елементів з проміжком
                        padding: 2, // Inner padding / Внутрішні відступи
                        marginBottom: 3, // Margin at the bottom / Нижній відступ
                        borderRadius: '12px', // Rounded corners / Закруглені кути
                        background: notification.read
                            ? 'linear-gradient(135deg, #e0e0e0 30%, #f5f5f5 90%)' // Grey gradient for read notifications / Сірий градієнт для прочитаних сповіщень
                            : 'linear-gradient(135deg, #2196f3 30%, #90caf9 90%)', // Blue gradient for unread notifications / Синій градієнт для непрочитаних сповіщень
                        color: notification.read ? '#616161' : '#ffffff', // Change text color based on read status / Зміна кольору тексту в залежності від статусу
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)', // Shadow effect / Ефект тіні
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animation for hover / Анімація при наведенні
                        '&:hover': {
                            transform: 'translateY(-5px)', // Move up on hover / Зміщення вгору при наведенні
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)', // Enhanced shadow on hover / Посилена тінь при наведенні
                        },
                    }}
                >
                    <Box sx={{ flex: 1 }}> {/* Container for notification content / Контейнер для вмісту сповіщення */}
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: notification.read ? 'normal' : 'bold' }} // Bold text if unread / Жирний текст, якщо непрочитане
                        >
                            {notification.message} {/* Notification message / Повідомлення сповіщення */}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ display: 'block', marginTop: '8px' }} // Display timestamp / Відображення мітки часу
                        >
                            {notification.timestamp ? new Date(notification.timestamp).toLocaleString() : 'No Date Available'} {/* Convert timestamp to locale string / Конвертування мітки часу у строку локалі */}
                        </Typography>
                    </Box>

                    {/* Show appropriate icon depending on whether notification is read */}
                    {/* Відобразити відповідну іконку в залежності від того, чи прочитане сповіщення */}
                    {!notification.read ? (
                        <IconButton
                            onClick={() => dispatch(markNotificationAsRead(notification._id))} // Mark notification as read / Позначити сповіщення як прочитане
                            sx={{
                                color: '#ffffff', // Icon color / Колір іконки
                                backgroundColor: '#43a047', // Background color / Колір фону
                                '&:hover': {
                                    backgroundColor: '#2e7d32', // Darker background on hover / Темніший фон при наведенні
                                },
                                marginLeft: 2, // Margin for spacing / Відступ для проміжку
                            }}
                        >
                            <CheckCircleOutlineIcon /> {/* Icon for marking as read / Іконка для позначення як прочитане */}
                        </IconButton>
                    ) : (
                        <IconButton disabled sx={{ color: '#9e9e9e', marginLeft: 2 }}> {/* Disabled icon for read notification / Вимкнена іконка для прочитаного сповіщення */}
                            <FiberNewIcon /> {/* Icon indicating new / Іконка, що вказує на нове */}
                        </IconButton>
                    )}
                </Paper>
            ))}
        </Box>
    );
};

export default NotificationList; // Export the component / Експорт компонента
