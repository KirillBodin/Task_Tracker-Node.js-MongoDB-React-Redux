import React, { useState, useEffect } from 'react'; // Import React and hooks / Імпорт React та хуків
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks / Імпорт хуків Redux
import { fetchProjects, addProject } from '../redux/projectSlice'; // Import actions for projects / Імпорт дій для проектів
import { fetchUsers } from '../redux/userSlice'; // Import action to fetch users / Імпорт дії для отримання користувачів
import {
    Box, Typography, Grid, Button, TextField, Dialog,
    DialogActions, DialogContent, DialogTitle, Paper, FormControl, InputLabel, Select, MenuItem
} from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { useNavigate } from 'react-router-dom'; // Import navigation hook / Імпорт хука для навігації

// Component for managing projects / Компонент для керування проектами
const ProjectsPage = () => {
    const dispatch = useDispatch(); // Initialize dispatch / Ініціалізуємо dispatch
    const projects = useSelector((state) => state.projects.projects); // Get projects from Redux store / Отримуємо проекти з Redux store
    const users = useSelector((state) => state.user.users); // Get users from Redux store / Отримуємо користувачів з Redux store
    const navigate = useNavigate(); // Initialize navigate hook / Ініціалізуємо хук navigate

    // State for dialog and form inputs / Стан для діалогу та полів форми
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [developer, setDeveloper] = useState('');

    // State for filters and search / Стан для фільтрів та пошуку
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    // Fetch projects and users on component mount / Отримуємо проекти та користувачів при монтуванні компонента
    useEffect(() => {
        dispatch(fetchProjects()); // Dispatch action to fetch projects / Викликаємо дію для отримання проектів
        dispatch(fetchUsers()); // Dispatch action to fetch users / Викликаємо дію для отримання користувачів
    }, [dispatch]);

    // Open the dialog to add a new project / Відкриття діалогу для додавання нового проекту
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close the dialog / Закриття діалогу
    const handleClose = () => {
        setOpen(false);
    };

    // Create a new project and close the dialog / Створення нового проекту та закриття діалогу
    const handleCreateProject = () => {
        dispatch(addProject({ title, description, startDate, endDate, developer: developer._id || developer })); // Dispatch action to add project / Викликаємо дію для додавання проекту
        setOpen(false); // Close dialog / Закриваємо діалог
    };

    // Filter projects based on search and filters / Фільтрація проектів на основі пошуку та фільтрів
    const filteredProjects = projects.filter(project => {
        // Filter by search query / Фільтрація за пошуковим запитом
        if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        // Filter by developer / Фільтрація за розробником
        if (selectedUser && project.developer !== selectedUser) {
            return false;
        }
        // Filter by date range / Фільтрація за діапазоном дат
        const projectStart = new Date(project.startDate);
        const projectEnd = new Date(project.endDate);
        if (filterStartDate && projectStart < new Date(filterStartDate)) return false;
        if (filterEndDate && projectEnd > new Date(filterEndDate)) return false;

        return true; // Return true if all conditions are met / Повертаємо true, якщо всі умови виконані
    });

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Projects {/* Header for projects / Заголовок для проектів */}
            </Typography>

            {/* Search and Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    label="Search Projects"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query state / Оновлення стану пошукового запиту
                    sx={{ flex: 1 }}
                />
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Developer</InputLabel>
                    <Select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)} // Update selected developer state / Оновлення стану вибраного розробника
                    >
                        <MenuItem value="">All Developers</MenuItem>
                        {users.map(user => (
                            <MenuItem key={user._id} value={user._id}>
                                {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)} // Update start date filter / Оновлення фільтра початкової дати
                />
                <TextField
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)} // Update end date filter / Оновлення фільтра кінцевої дати
                />
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen} // Open dialog to add project / Відкриваємо діалог для додавання проекту
                sx={{
                    marginBottom: 3,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                }}
            >
                Add Project {/* Button to add a new project / Кнопка для додавання нового проекту */}
            </Button>

            {/* Dialog to add a project / Діалог для додавання проекту */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a New Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Project Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Update project title state / Оновлення стану назви проекту
                    />
                    <TextField
                        margin="dense"
                        label="Project Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update project description state / Оновлення стану опису проекту
                    />
                    <TextField
                        margin="dense"
                        label="Start Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} // Update start date state / Оновлення стану початкової дати
                    />
                    <TextField
                        margin="dense"
                        label="End Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)} // Update end date state / Оновлення стану кінцевої дати
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Developer</InputLabel>
                        <Select
                            value={developer}
                            onChange={(e) => setDeveloper(e.target.value)} // Update developer state / Оновлення стану розробника
                        >
                            <MenuItem value="">Not Assigned</MenuItem>
                            {users.map(user => (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#1976d2' }}>
                        Cancel {/* Button to cancel adding project / Кнопка для відміни додавання проекту */}
                    </Button>
                    <Button onClick={handleCreateProject} variant="contained" sx={{ backgroundColor: '#1976d2' }}>
                        Add Project {/* Button to add the project / Кнопка для додавання проекту */}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Grid Layout for Projects */}
            <Grid container spacing={3}>
                {filteredProjects.map((project) => {
                    const assignedDeveloper = users.find(user => user._id === project.developer?._id || project.developer); // Find assigned developer / Знаходимо призначеного розробника
                    console.log(`Project: ${project.title}, Developer ID: ${project.developer}, Assigned Developer: ${assignedDeveloper?.username}`);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 2,
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#e3f2fd',
                                        cursor: 'pointer',
                                    },
                                    height: '100%',
                                }}
                                onClick={() => navigate(`/projects/${project._id}`)} // Navigate to project detail / Переходимо до деталей проекту
                            >
                                <Typography sx={{ fontWeight: 'bold', color: '#424242' }}>
                                    {project.title} {/* Display project title / Відображення назви проекту */}
                                </Typography>
                                <Typography sx={{ color: '#616161' }}>
                                    {project.description} {/* Display project description / Відображення опису проекту */}
                                </Typography>
                                <Typography sx={{ color: '#616161' }}>
                                    Start Date: {new Date(project.startDate).toLocaleDateString()} {/* Display project start date / Відображення дати початку проекту */}
                                </Typography>
                                <Typography sx={{ color: '#616161' }}>
                                    End Date: {new Date(project.endDate).toLocaleDateString()} {/* Display project end date / Відображення дати завершення проекту */}
                                </Typography>
                                <Typography sx={{ color: '#616161' }}>
                                    Developer: {assignedDeveloper?.username || 'Not Assigned'} {/* Display assigned developer / Відображення призначеного розробника */}
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ProjectsPage; // Export ProjectsPage component / Експорт компонента ProjectsPage
