import React, { useEffect, useState } from 'react'; // Import React and hooks for state and effect management / Імпорт React та хуків для управління станом та ефектами
import axios from 'axios'; // Import Axios for making HTTP requests / Імпорт Axios для виконання HTTP-запитів
import { Box, Typography, List, ListItem, Divider } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI

const TaskCompletionReport = () => {
    const [report, setReport] = useState([]); // State to store task completion report / Стан для зберігання звіту про виконання завдань

    useEffect(() => {
        const fetchReport = async () => { // Function to fetch task completion report from server / Функція для отримання звіту про виконання завдань з сервера
            try {
                const response = await axios.get('/api/reports/tasks'); // Fetch report data from API endpoint / Отримати дані звіту з API
                setReport(response.data); // Update state with fetched data / Оновити стан отриманими даними
            } catch (error) {
                console.error("Error fetching task completion report:", error); // Log errors if fetching fails / Вивести помилки, якщо запит не вдався
            }
        };

        fetchReport(); // Call the function to fetch the report when component mounts / Виклик функції для отримання звіту при монтуванні компонента
    }, []); // Empty dependency array means this effect runs only once / Порожній масив залежностей означає, що цей ефект виконується лише один раз

    return (
        <Box> {/* Container for the task completion report / Контейнер для звіту про виконання завдань */}
            <Typography variant="h4" gutterBottom>Task Completion Report</Typography> {/* Title for the report section / Заголовок секції звіту */}
            <List> {/* List container for displaying tasks / Контейнер списку для відображення завдань */}
                {report.map((task, index) => ( // Iterate over each task in the report / Перебір кожного завдання у звіті
                    <React.Fragment key={index}> {/* Wrapper to hold list items and dividers / Обгортка для елементів списку та розділювачів */}
                        <ListItem> {/* List item for individual task / Елемент списку для окремого завдання */}
                            <Typography variant="h6">{task.title}</Typography> {/* Task title / Назва завдання */}
                            <Typography variant="body1">Status: {task.status}</Typography> {/* Task status / Статус завдання */}
                            <Typography variant="body2">Start Date: {new Date(task.startDate).toLocaleDateString()}</Typography> {/* Formatted start date / Форматована дата початку */}
                            <Typography variant="body2">End Date: {new Date(task.endDate).toLocaleDateString()}</Typography> {/* Formatted end date / Форматована дата завершення */}
                        </ListItem>
                        {index < report.length - 1 && <Divider />} {/* Divider between tasks, except after the last one / Розділювач між завданнями, крім останнього */}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default TaskCompletionReport; // Export the component / Експорт компонента
