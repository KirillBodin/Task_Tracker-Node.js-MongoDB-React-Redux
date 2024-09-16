import React, { useEffect } from 'react'; // Import React and useEffect hook / Імпорт React та хука useEffect
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks / Імпорт хук Redux
import { fetchTasksByProject, deleteTask } from '../redux/taskSlice'; // Import actions for tasks / Імпорт дій для завдань
import { fetchProjectById } from '../redux/projectSlice'; // Import action to fetch a project by ID / Імпорт дії для отримання проєкту за ID
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for route parameters and navigation / Імпорт хук для параметрів маршруту та навігації
import { Box, Typography, List, ListItemText, IconButton, Button, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon / Імпорт іконки видалення

// Component to display project details / Компонент для відображення деталей проєкту
const ProjectDetailPage = () => {
    const { projectId } = useParams(); // Get projectId from URL parameters / Отримуємо projectId з параметрів URL
    const dispatch = useDispatch(); // Initialize dispatch / Ініціалізуємо dispatch
    const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from Redux store / Отримуємо завдання з Redux store
    const project = useSelector((state) => state.projects.projects.find(p => p._id === projectId)); // Get project details by ID / Отримуємо деталі проєкту за ID
    const navigate = useNavigate(); // Initialize navigate hook / Ініціалізуємо хук navigate

    // Fetch project and its tasks on component mount / Отримуємо проєкт та його завдання при монтуванні компонента
    useEffect(() => {
        dispatch(fetchProjectById(projectId)); // Dispatch action to fetch project / Викликаємо дію для отримання проєкту
        dispatch(fetchTasksByProject(projectId)); // Dispatch action to fetch tasks for the project / Викликаємо дію для отримання завдань проєкту
    }, [dispatch, projectId]);

    // Handle task deletion / Обробка видалення завдання
    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId)); // Dispatch action to delete the task / Викликаємо дію для видалення завдання
    };

    return (
        <Box sx={{ padding: 4 }}>
            {project && ( // If project exists, display its details / Якщо проєкт існує, відображаємо його деталі
                <Paper
                    elevation={3}
                    sx={{
                        padding: 3,
                        marginBottom: 4,
                        borderRadius: 2,
                        backgroundColor: '#f5f5f5',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {project.title} {/* Display project title / Відображення назви проєкту */}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#616161' }}>
                        {project.description} {/* Display project description / Відображення опису проєкту */}
                    </Typography>
                </Paper>
            )}
            <Button
                variant="contained"
                color="primary"
                sx={{
                    marginBottom: 3,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                }}
                onClick={() => navigate(`/projects/${projectId}/add-task`)} // Navigate to add task page / Переходимо на сторінку додавання завдання
            >
                Add Task {/* Button to add a new task / Кнопка для додавання нового завдання */}
            </Button>
            <List>
                {tasks.length > 0 ? ( // Check if there are tasks / Перевіряємо, чи є завдання
                    tasks.map((task) => ( // Map through tasks / Перебираємо завдання
                        <Paper
                            key={task._id}
                            elevation={2}
                            sx={{
                                padding: 2,
                                marginBottom: 2,
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                                },
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontWeight: 'bold', color: '#424242' }}>
                                        {task.title} {/* Display task title / Відображення назви завдання */}
                                    </Typography>
                                }
                                secondary={
                                    <Typography sx={{ color: '#616161' }}>
                                        {task.description} {/* Display task description / Відображення опису завдання */}
                                    </Typography>
                                }
                            />
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
                                <DeleteIcon sx={{ color: '#d32f2f' }} /> {/* Icon button to delete task / Іконка для видалення завдання */}
                            </IconButton>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ color: '#616161' }}>
                        No tasks found for this project. {/* Message if no tasks are found / Повідомлення, якщо завдання не знайдено */}
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default ProjectDetailPage; // Export ProjectDetailPage component / Експорт компонента ProjectDetailPage
