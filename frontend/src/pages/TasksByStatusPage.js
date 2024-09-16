import React, { useEffect, useState } from 'react'; // Importing React and useState, useEffect hooks / Імпортуємо React та хуки useState, useEffect
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks from react-redux / Імпортуємо хуки з react-redux
import { fetchTasksByStatus, updateTask } from '../redux/taskSlice'; // Importing actions / Імпортуємо дії
import { fetchProjects } from '../redux/projectSlice'; // Importing actions for fetching projects / Імпортуємо дії для отримання проектів
import { fetchUsers } from '../redux/userSlice'; // Importing actions for fetching users / Імпортуємо дії для отримання користувачів
import TaskItem from '../components/TaskItem'; // Importing TaskItem component / Імпортуємо компонент TaskItem
import TaskFilter from '../components/TaskFilter'; // Importing TaskFilter component / Імпортуємо компонент TaskFilter
import { useParams } from 'react-router-dom'; // Importing useParams hook for getting route params / Імпортуємо хук useParams для отримання параметрів маршруту
import { useTheme } from '@mui/material/styles'; // Importing useTheme for theming / Імпортуємо useTheme для роботи з темами
import { LocalizationProvider } from '@mui/x-date-pickers'; // Importing for date localization / Імпортуємо для локалізації дат
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'; // Importing Moment adapter / Імпортуємо адаптер Moment
import moment from 'moment'; // Importing moment.js for date manipulation / Імпортуємо moment.js для роботи з датами
import {
    Box,
    Typography,
    List,
    ListItem,
    Divider,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@mui/material'; // Importing components from Material-UI / Імпортуємо компоненти з Material-UI
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Importing DatePicker component / Імпортуємо компонент DatePicker

const TasksByStatusPage = () => {
    const dispatch = useDispatch(); // Initializing dispatch / Ініціалізуємо dispatch
    const { status } = useParams(); // Get status parameter from the URL / Отримуємо параметр статусу з URL
    const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from Redux state / Отримуємо завдання зі стану Redux
    const projects = useSelector((state) => state.projects.projects); // Get projects from Redux state / Отримуємо проекти зі стану Redux
    const users = useSelector((state) => state.user.users); // Get users from Redux state / Отримуємо користувачів зі стану Redux
    const theme = useTheme(); // Using theme for styling / Використовуємо тему для стилізації
    const [projectAssignments, setProjectAssignments] = useState({}); // State for storing project assignments / Стан для збереження призначень проектів
    const [selectedUser, setSelectedUser] = useState('all'); // State for selected user filter / Стан для вибраного фільтру користувача
    const [startDate, setStartDate] = useState(null); // State for start date filter / Стан для фільтра дати початку
    const [endDate, setEndDate] = useState(null); // State for end date filter / Стан для фільтра дати закінчення
    const [searchTerm, setSearchTerm] = useState(''); // State for search term / Стан для пошукового запиту

    useEffect(() => {
        // Fetch tasks, projects, and users when the component mounts / Отримуємо завдання, проекти та користувачів при монтованні компонента
        if (status) {
            dispatch(fetchTasksByStatus(status)); // Fetch tasks by status / Отримуємо завдання за статусом
            dispatch(fetchProjects()); // Fetch projects / Отримуємо проекти
            dispatch(fetchUsers()); // Fetch users / Отримуємо користувачів
        }
    }, [dispatch, status]); // Dependency array ensures this runs only when dispatch or status changes / Масив залежностей гарантує, що це виконається лише при зміні dispatch або статусу

    // Group and filter tasks by project / Групуємо та фільтруємо завдання за проектами
    const filteredTasksByProject = tasks.reduce((acc, task) => {
        const projectTitle = task.project ? task.project.title : 'No Project'; // Get project title or use 'No Project' if undefined / Отримуємо назву проекту або використовуємо 'No Project', якщо не визначено

        // Apply filters / Застосовуємо фільтри
        const matchesUser = selectedUser === 'all' || task.assignedTo === selectedUser; // Check if task matches selected user / Перевіряємо, чи завдання відповідає вибраному користувачу
        const matchesDateRange = (!startDate || moment(task.startDate).isSameOrAfter(moment(startDate))) &&
            (!endDate || moment(task.endDate).isSameOrBefore(moment(endDate))); // Check if task is within date range / Перевіряємо, чи завдання у вказаному діапазоні дат
        const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase()); // Check if task matches search term / Перевіряємо, чи завдання відповідає пошуковому запиту

        if (matchesUser && matchesDateRange && matchesSearchTerm) { // If all filters match / Якщо всі фільтри відповідають
            if (!acc[projectTitle]) {
                acc[projectTitle] = []; // Initialize array if not exist / Ініціалізуємо масив, якщо не існує
            }
            acc[projectTitle].push(task); // Add task to the project group / Додаємо завдання до групи проекту
        }
        return acc;
    }, {});

    // Handler for changing the project assignment / Обробник зміни призначення проекту
    const handleProjectChange = (taskId, projectId) => {
        setProjectAssignments({
            ...projectAssignments,
            [taskId]: projectId,
        });
    };

    // Handler for assigning a task to a project / Обробник призначення завдання проекту
    const handleAssignTaskToProject = (taskId) => {
        const projectId = projectAssignments[taskId]; // Get selected project ID / Отримуємо вибраний ID проекту
        if (projectId) {
            const task = tasks.find(task => task._id === taskId); // Find the task / Знаходимо завдання
            if (task) {
                const updatedTask = {
                    ...task,
                    project: { _id: projectId, title: projects.find(p => p._id === projectId)?.title || 'No Project' }
                }; // Create an updated task object / Створюємо оновлений об'єкт завдання
                dispatch(updateTask({ id: task._id, updatedTask })).then(() => {
                    const updatedTasks = tasks.map(t => t._id === taskId ? updatedTask : t); // Update tasks in state / Оновлюємо завдання у стані
                    setProjectAssignments({}); // Clear project selection / Очищаємо вибір проекту
                    dispatch({ type: 'tasks/setTasks', payload: updatedTasks }); // Update state in redux / Оновлюємо стан у redux
                });
            }
        }
    };

    // Handler for updating task dates / Обробник оновлення дат завдання
    const handleUpdateTaskDates = (taskId, newStartDate, newEndDate) => {
        const task = tasks.find(task => task._id === taskId); // Find the task / Знаходимо завдання
        if (task) {
            const updatedTask = {
                ...task,
                startDate: newStartDate ? newStartDate.toISOString() : task.startDate, // Update start date / Оновлюємо дату початку
                endDate: newEndDate ? newEndDate.toISOString() : task.endDate, // Update end date / Оновлюємо дату закінчення
            };
            dispatch(updateTask({ id: task._id, updatedTask })).then(() => {
                const updatedTasks = tasks.map(t => t._id === taskId ? updatedTask : t); // Update tasks in state / Оновлюємо завдання у стані
                dispatch({ type: 'tasks/setTasks', payload: updatedTasks }); // Update state in redux / Оновлюємо стан у redux
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}> {/* Providing localization for date pickers / Надаємо локалізацію для вибору дат */}
            <Box sx={{ padding: 3, backgroundColor: theme.palette.background.default }}>
                <Typography
                    variant="h4"
                    color={theme.palette.primary.main}
                    sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)} Tasks {/* Displaying the task status in a formatted way / Відображаємо статус завдання у відформатованому вигляді */}
                </Typography>

                {/* Task Filter Component / Компонент фільтру завдань */}
                <TaskFilter
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {Object.keys(filteredTasksByProject).map((projectTitle) => ( // Iterate over projects / Ітеруємо по проектах
                    <Box key={projectTitle} sx={{ marginBottom: '20px' }}>
                        <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                            sx={{ fontWeight: 'medium', marginBottom: 2 }}
                        >
                            {projectTitle} {/* Display project title / Відображаємо назву проекту */}
                        </Typography>
                        <List>
                            {filteredTasksByProject[projectTitle].map((task) => ( // Iterate over tasks in the project / Ітеруємо по завданнях у проекті
                                <React.Fragment key={task._id}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: 2,
                                            borderRadius: '8px',
                                            backgroundColor: '#fff',
                                            marginBottom: 2,
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.02)',
                                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                                            },
                                        }}
                                    >
                                        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <TaskItem task={task} /> {/* Display task item / Відображаємо елемент завдання */}

                                            <FormControl sx={{ marginTop: 2, minWidth: 200 }}>
                                                <InputLabel id={`select-project-label-${task._id}`}>Project</InputLabel>
                                                <Select
                                                    labelId={`select-project-label-${task._id}`}
                                                    value={projectAssignments[task._id] || task.project?._id || ''}
                                                    onChange={(e) => handleProjectChange(task._id, e.target.value)}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em> {/* No project option / Опція без проекту */}
                                                    </MenuItem>
                                                    {projects.map((project) => ( // Iterate over projects / Ітеруємо по проектах
                                                        <MenuItem key={project._id} value={project._id}>
                                                            {project.title} {/* Display project title / Відображаємо назву проекту */}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <Button
                                                variant="contained"
                                                onClick={() => handleAssignTaskToProject(task._id)}
                                                sx={{
                                                    marginTop: 2,
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.primary.dark,
                                                    },
                                                }}
                                            >
                                                Assign to Project {/* Button to assign task to project / Кнопка для призначення завдання проекту */}
                                            </Button>

                                            {/* Start Date and End Date Editing / Редагування дати початку та завершення */}
                                            <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
                                                <DatePicker
                                                    label="Start Date"
                                                    value={task.startDate ? moment(task.startDate) : null}
                                                    onChange={(date) => handleUpdateTaskDates(task._id, date, task.endDate)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                                <DatePicker
                                                    label="End Date"
                                                    value={task.endDate ? moment(task.endDate) : null}
                                                    onChange={(date) => handleUpdateTaskDates(task._id, task.startDate, date)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </Box>
                                        </ListItem>
                                    </Paper>
                                    <Divider sx={{ bgcolor: theme.palette.divider }} />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>
        </LocalizationProvider>
    );
};

export default TasksByStatusPage; // Exporting the component / Експортуємо компонент
