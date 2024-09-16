import React, { useEffect } from 'react'; // Importing React and the useEffect hook / Імпортуємо React та хук useEffect
import { useDispatch } from 'react-redux'; // Importing the useDispatch hook from react-redux / Імпортуємо хук useDispatch з react-redux
import { fetchTasks } from '../redux/taskSlice'; // Importing the fetchTasks action / Імпортуємо дію fetchTasks
import { fetchProjects } from '../redux/projectSlice'; // Importing the fetchProjects action / Імпортуємо дію fetchProjects
import { Grid, Typography, Box, Paper } from '@mui/material'; // Importing components from Material-UI / Імпортуємо компоненти з Material-UI
import TaskList from '../components/TaskList'; // Importing the TaskList component / Імпортуємо компонент TaskList
import TaskStages from '../components/TaskStages'; // Importing the TaskStages component / Імпортуємо компонент TaskStages
import { useTheme } from '@mui/material/styles'; // Importing the useTheme hook for theming / Імпортуємо хук useTheme для роботи з темою

const TaskManagementPage = () => {
    const dispatch = useDispatch(); // Initializing the dispatch function / Ініціалізуємо функцію dispatch
    const theme = useTheme(); // Using theme for styling / Використовуємо тему для стилізації

    useEffect(() => {
        // Dispatching actions to fetch tasks and projects when the component mounts / Відправляємо дії для отримання завдань та проектів при монтованні компоненту
        dispatch(fetchTasks()); // Fetch tasks / Отримуємо завдання
        dispatch(fetchProjects()); // Fetch projects / Отримуємо проекти
    }, [dispatch]); // Empty dependency array ensures this runs only once / Порожній масив залежностей гарантує, що це виконається лише один раз

    return (
        <Box sx={{ backgroundColor: theme.palette.background.default, padding: 4, minHeight: '100vh' }}>
            <Paper
                elevation={3} // Elevation for box shadow / Висота для тіні
                sx={{
                    padding: 3,
                    marginBottom: 4,
                    backgroundColor: theme.palette.background.paper, // Using theme for background color / Використовуємо тему для кольору фону
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Box shadow style / Стиль тіні
                    borderRadius: '12px', // Rounding corners / Закруглення кутів
                }}
            >
                <Typography variant="h4" color={theme.palette.text.primary} sx={{ fontWeight: 'bold' }}>
                    Task Management
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={2}
                        sx={{
                            padding: 2,
                            borderRadius: '12px',
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ marginBottom: 2, color: theme.palette.text.primary, fontWeight: 'bold' }}
                        >
                            Task List
                        </Typography>
                        <TaskList /> {/* Displaying the TaskList component / Відображаємо компонент TaskList */}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper
                        elevation={2}
                        sx={{
                            padding: 2,
                            borderRadius: '12px',
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ marginBottom: 2, color: theme.palette.text.primary, fontWeight: 'bold' }}
                        >
                            Task Stages
                        </Typography>
                        <TaskStages /> {/* Displaying the TaskStages component / Відображаємо компонент TaskStages */}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaskManagementPage; // Exporting the TaskManagementPage component / Експортуємо компонент TaskManagementPage
