import React, { useEffect, useState } from 'react'; // Import React and hooks for managing state and effects / Імпорт React та хуків для управління станом та ефектами
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for dispatching actions and selecting state from the Redux store / Імпорт хуків для відправки дій та вибору стану з Redux store
import { fetchProjects, updateProject } from '../redux/projectSlice'; // Import actions for fetching and updating projects / Імпорт дій для отримання та оновлення проєктів
import { fetchUsers } from '../redux/userSlice'; // Import action for fetching users / Імпорт дії для отримання користувачів
import { List, ListItem, ListItemText, Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI

const AssignProjectsPage = () => { // Component for assigning projects to developers / Компонент для призначення проєктів розробникам
    const dispatch = useDispatch(); // Initialize dispatch to send actions to the store / Ініціалізація dispatch для відправлення дій до store
    const projects = useSelector((state) => state.projects.projects); // Get projects from Redux store / Отримати проєкти з Redux store
    const users = useSelector((state) => state.users.users); // Get users from Redux store / Отримати користувачів з Redux store
    const [selectedProject, setSelectedProject] = useState(''); // State for the selected project / Стан для вибраного проєкту
    const [selectedDeveloper, setSelectedDeveloper] = useState(''); // State for the selected developer / Стан для вибраного розробника

    useEffect(() => {
        dispatch(fetchProjects()); // Fetch projects when the component mounts / Отримати проєкти при монтуванні компонента
        dispatch(fetchUsers()); // Fetch users when the component mounts / Отримати користувачів при монтуванні компонента
    }, [dispatch]); // Effect depends on dispatch / Ефект залежить від dispatch

    // Handle assigning a developer to a project / Обробник призначення розробника до проєкту
    const handleAssignDeveloper = () => {
        if (selectedProject && selectedDeveloper) { // Ensure both project and developer are selected / Перевірити, чи вибрані обидва - проєкт та розробник
            dispatch(updateProject({ id: selectedProject, developerId: selectedDeveloper })); // Dispatch action to update the project with the selected developer / Відправити дію для оновлення проєкту з вибраним розробником
        }
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}> {/* Main container for the page / Головний контейнер для сторінки */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Assign Projects to Developers {/* Page title / Заголовок сторінки */}
            </Typography>
            <List sx={{ marginTop: 2 }}>
                {projects.map((project) => ( // Map over each project / Перебір кожного проєкту
                    <Paper
                        key={project._id} // Unique key for each project / Унікальний ключ для кожного проєкту
                        elevation={3} // Elevation for paper styling / Підняття для стилізації Paper
                        sx={{
                            padding: 3,
                            marginBottom: 4,
                            backgroundColor: '#fff',
                            '&:hover': {
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Add shadow on hover / Додати тінь при наведенні
                            },
                        }}
                    >
                        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <ListItemText
                                primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: '#424242' }}>{project.title}</Typography>} // Display project title / Відображення назви проєкту
                                secondary={<Typography sx={{ color: '#616161' }}>{project.description}</Typography>} // Display project description / Відображення опису проєкту
                                sx={{ marginBottom: 2 }}
                            />
                            <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
                                <InputLabel>Developer</InputLabel> {/* Label for the select input / Мітка для поля вибору */}
                                <Select
                                    value={selectedDeveloper} // Bind selected developer state / Прив'язка стану вибраного розробника
                                    onChange={(e) => setSelectedDeveloper(e.target.value)} // Handle change in selected developer / Обробник зміни вибраного розробника
                                    label="Developer"
                                >
                                    {users.filter(user => user.role === 'developer').map((user) => ( // Filter users by role / Фільтрація користувачів за роллю
                                        <MenuItem key={user._id} value={user._id}> {/* List developers in the dropdown / Список розробників у випадаючому меню */}
                                            {user.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                    setSelectedProject(project._id); // Set selected project state / Встановити стан вибраного проєкту
                                    handleAssignDeveloper(); // Assign the selected developer to the project / Призначити вибраного розробника до проєкту
                                }}
                                sx={{
                                    backgroundColor: '#1976d2', // Button background color / Колір фону кнопки
                                    '&:hover': {
                                        backgroundColor: '#1565c0', // Background color on hover / Колір фону при наведенні
                                    },
                                }}
                            >
                                Assign {/* Button text / Текст кнопки */}
                            </Button>
                        </ListItem>
                    </Paper>
                ))}
            </List>
        </Box>
    );
};

export default AssignProjectsPage; // Export the AssignProjectsPage component / Експорт компонента AssignProjectsPage
