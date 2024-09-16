import React, { useEffect, useState } from 'react'; // Import React hooks / Імпорт React хуків
import axios from 'axios'; // Import Axios for data fetching / Імпорт Axios для отримання даних
import { Box, Typography, Grid, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { Link } from 'react-router-dom'; // Import Link for navigation / Імпорт Link для навігації

const DashboardAnalytics = () => {
    // State to hold dashboard analytics data such as total projects and tasks / Стан для зберігання даних аналітики, таких як загальна кількість проєктів і завдань
    const [analytics, setAnalytics] = useState({
        totalProjects: 0, // Total number of projects / Загальна кількість проєктів
        totalTasks: 0, // Total number of tasks / Загальна кількість завдань
        completedTasks: 0, // Number of completed tasks / Кількість виконаних завдань
        inProgressTasks: 0, // Number of tasks in progress / Кількість завдань у процесі
        completionPercentage: 0, // Percentage of tasks completed / Відсоток виконаних завдань
    });

    useEffect(() => {
        // Fetch analytics data from the server when the component mounts / Отримати дані аналітики з сервера при монтуванні компонента
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('/api/dashboard/analytics'); // Request analytics data from the API / Запит даних аналітики з API
                setAnalytics(response.data); // Store the retrieved analytics data in state / Зберегти отримані дані аналітики в стані
            } catch (error) {
                console.error("Error fetching analytics data:", error); // Log any errors / Вивести помилки в консоль
            }
        };

        fetchAnalytics(); // Invoke the function to fetch data / Виклик функції для отримання даних
    }, []); // Empty dependency array means this effect runs only once / Порожній масив залежностей означає, що цей ефект виконується лише один раз

    return (
        <Box> {/* Wrapper for the entire analytics section / Обгортка для всієї секції аналітики */}
            <Typography variant="h4" gutterBottom>Dashboard Analytics</Typography> {/* Main title for the dashboard / Головний заголовок для панелі */}
            <Grid container spacing={3}> {/* Layout grid for analytics items / Сітка макета для елементів аналітики */}
                <Grid item xs={12} md={3}> {/* Grid item for displaying total projects / Елемент сітки для відображення загальної кількості проєктів */}
                    <Link to="/projects" style={{ textDecoration: 'none' }}> {/* Link to the projects page / Посилання на сторінку проєктів */}
                        <Paper elevation={3} sx={{ padding: 2 }}> {/* Box with shadow and padding to display data / Блок з тінню та відступом для відображення даних */}
                            <Typography variant="h6">Total Projects</Typography> {/* Label for total projects / Мітка для загальної кількості проєктів */}
                            <Typography variant="h4">{analytics.totalProjects}</Typography> {/* Display total projects count / Відображення кількості проєктів */}
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} md={3}> {/* Grid item for displaying total tasks / Елемент сітки для відображення загальної кількості завдань */}
                    <Link to="/tasks/status/All" style={{ textDecoration: 'none' }}> {/* Link to view all tasks / Посилання для перегляду всіх завдань */}
                        <Paper elevation={3} sx={{ padding: 2 }}> {/* Box with shadow and padding to display data / Блок з тінню та відступом для відображення даних */}
                            <Typography variant="h6">Total Tasks</Typography> {/* Label for total tasks / Мітка для загальної кількості завдань */}
                            <Typography variant="h4">{analytics.totalTasks}</Typography> {/* Display total tasks count / Відображення кількості завдань */}
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} md={3}> {/* Grid item for displaying completed tasks / Елемент сітки для відображення виконаних завдань */}
                    <Link to="/tasks/status/Done" style={{ textDecoration: 'none' }}> {/* Link to view completed tasks / Посилання для перегляду виконаних завдань */}
                        <Paper elevation={3} sx={{ padding: 2 }}> {/* Box with shadow and padding to display data / Блок з тінню та відступом для відображення даних */}
                            <Typography variant="h6">Completed Tasks</Typography> {/* Label for completed tasks / Мітка для виконаних завдань */}
                            <Typography variant="h4">{analytics.completedTasks}</Typography> {/* Display completed tasks count / Відображення кількості виконаних завдань */}
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} md={3}> {/* Grid item for displaying tasks in progress / Елемент сітки для відображення завдань у процесі */}
                    <Link to="/tasks/status/In_Progress" style={{ textDecoration: 'none' }}> {/* Link to view tasks in progress / Посилання для перегляду завдань у процесі */}
                        <Paper elevation={3} sx={{ padding: 2 }}> {/* Box with shadow and padding to display data / Блок з тінню та відступом для відображення даних */}
                            <Typography variant="h6">In Progress Tasks</Typography> {/* Label for tasks in progress / Мітка для завдань у процесі */}
                            <Typography variant="h4">{analytics.inProgressTasks}</Typography> {/* Display in-progress tasks count / Відображення кількості завдань у процесі */}
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} md={3}> {/* Grid item for displaying completion percentage / Елемент сітки для відображення відсотка виконання */}
                    <Link to="/reports/tasks" style={{ textDecoration: 'none' }}> {/* Link to view task completion report / Посилання для перегляду звіту про виконання завдань */}
                        <Paper elevation={3} sx={{ padding: 2 }}> {/* Box with shadow and padding to display data / Блок з тінню та відступом для відображення даних */}
                            <Typography variant="h6">Completion Percentage</Typography> {/* Label for task completion percentage / Мітка для відсотка виконання завдань */}
                            <Typography variant="h4">{analytics.completionPercentage}%</Typography> {/* Display completion percentage / Відображення відсотка виконання */}
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardAnalytics; // Export DashboardAnalytics component / Експорт компонента DashboardAnalytics
