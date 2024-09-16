import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ActivityFeed = () => {
    // Initialize state to store activities fetched from the server
    // Инициализация состояния для хранения активностей, полученных с сервера
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Define an asynchronous function to fetch activities
        // Определение асинхронной функции для получения активностей
        const fetchActivities = async () => {
            try {
                // Make an HTTP GET request to fetch user's activities
                // Выполнение HTTP GET-запроса для получения активностей пользователя
                const response = await axios.get('/api/activity/myactivity');

                // Update the activities state with the data from the response
                // Обновление состояния активностей данными из ответа
                setActivities(response.data);
            } catch (error) {
                // Log error to the console if the request fails
                // Вывод ошибки в консоль, если запрос не удался
                console.error('Error fetching activities:', error);
            }
        };

        // Call the fetchActivities function when the component mounts
        // Вызов функции fetchActivities при монтировании компонента
        fetchActivities();
    }, []); // Empty dependency array means this effect runs only once
    // Пустой массив зависимостей означает, что этот эффект выполняется только один раз

    return (
        <Box>
            {/* Display a heading for the recent activities list */}
            {/* Отображение заголовка для списка последних активностей */}
            <Typography variant="h6" gutterBottom>
                Recent Activity {/* Заголовок "Recent Activity" */}
            </Typography>

            {/* Render a list of activities */}
            {/* Отрисовка списка активностей */}
            <List>
                {activities.map((activity) => (
                    // Map through the activities and render each one as a ListItem
                    // Перебор активностей и отображение каждой как ListItem
                    <ListItem key={activity._id}>
                        {/* Display the main action and details with timestamp */}
                        {/* Отображение основного действия и деталей с меткой времени */}
                        <ListItemText
                            primary={activity.action} // Main action of the activity
                            // Основное действие активности
                            secondary={`${activity.details} - ${new Date(activity.createdAt).toLocaleString()}`}
                            // Details and timestamp formatted to locale string
                            // Детали и временная метка, отформатированные в строку локали
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ActivityFeed;
