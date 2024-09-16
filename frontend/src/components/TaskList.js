import React from 'react'; // Import React for creating the component / Імпорт React для створення компонента
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store / Імпорт useSelector для доступу до Redux store
import { List, ListItem, ListItemText, Typography, Box, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI

const TaskList = ({ filterStatus }) => { // TaskList component to display tasks filtered by status / Компонент TaskList для відображення завдань, відфільтрованих за статусом
    const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from the Redux store / Отримати завдання з Redux store
    const projects = useSelector((state) => state.projects.projects); // Get projects from the Redux store / Отримати проєкти з Redux store

    // Filter tasks based on the provided status / Фільтрувати завдання на основі наданого статусу
    const filteredTasks = tasks.filter(task => task.status === filterStatus);

    // Group tasks by project / Групувати завдання за проєктом
    const tasksByProject = projects.map(project => ({
        project, // The current project / Поточний проєкт
        tasks: filteredTasks.filter(task => task.project === project._id), // Filter tasks belonging to this project / Фільтрувати завдання, що належать цьому проєкту
    })).filter(group => group.tasks.length > 0); // Remove projects with no tasks / Видалити проєкти без завдань

    return (
        <Box sx={{ marginTop: 3 }}> {/* Container for the list of tasks / Контейнер для списку завдань */}
            {tasksByProject.map(group => ( // Iterate over each project group / Перебір кожної групи проєктів
                <Paper
                    key={group.project._id} // Unique key for each project / Унікальний ключ для кожного проєкту
                    elevation={2} // Set elevation for Paper component / Встановити підняття для компонента Paper
                    sx={{
                        padding: 2, // Padding inside the Paper / Відступи всередині Paper
                        marginBottom: 3, // Margin at the bottom of each Paper / Відступ знизу для кожного Paper
                        borderRadius: '10px', // Rounded corners / Закруглені кути
                        backgroundColor: '#f0f4f8', // Background color / Колір фону
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {group.project.title} {/* Display the project title / Відображення назви проєкту */}
                    </Typography>
                    <List> {/* List of tasks for this project / Список завдань для цього проєкту */}
                        {group.tasks.map((task) => ( // Iterate over each task in the project / Перебір кожного завдання в проєкті
                            <ListItem key={task._id} sx={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}> {/* Individual task item / Окремий елемент завдання */}
                                <ListItemText
                                    primary={<Typography sx={{ color: '#424242' }}>{task.title}</Typography>} // Task title / Назва завдання
                                    secondary={<Typography sx={{ color: '#616161' }}>{task.description}</Typography>} // Task description / Опис завдання
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ))}
        </Box>
    );
};

export default TaskList; // Export the TaskList component / Експорт компонента TaskList
