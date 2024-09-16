import React, { useEffect, useState, useContext } from 'react'; // Import React and hooks / Імпорт React та хуків
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for dispatching actions and selecting state / Імпорт хуків для відправлення дій та вибору стану
import { useNavigate } from 'react-router-dom'; // Import hook for navigation / Імпорт хука для навігації
import { fetchTasks } from '../redux/taskSlice'; // Import action for fetching tasks / Імпорт дії для отримання завдань
import { fetchProjects } from '../redux/projectSlice'; // Import action for fetching projects / Імпорт дії для отримання проєктів
import { fetchUsers, fetchUserProfile } from '../redux/userSlice'; // Import actions for fetching users and user profile / Імпорт дій для отримання користувачів та профілю користувача
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar component / Імпорт компонента FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Import day grid plugin for FullCalendar / Імпорт плагіну day grid для FullCalendar
import listPlugin from '@fullcalendar/list'; // Import list plugin for FullCalendar / Імпорт плагіну списку для FullCalendar
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin for FullCalendar / Імпорт плагіну взаємодії для FullCalendar
import moment from 'moment'; // Import moment for date manipulation / Імпорт moment для роботи з датами
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { ThemeContext } from '../theme/ThemeContext'; // Import ThemeContext for theme management / Імпорт ThemeContext для управління темою
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import DatePicker for date selection / Імпорт DatePicker для вибору дати
import { LocalizationProvider } from '@mui/x-date-pickers'; // Import LocalizationProvider for date picker localization / Імпорт LocalizationProvider для локалізації компонента вибору дати
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'; // Import AdapterMoment to use moment.js with DatePicker / Імпорт AdapterMoment для використання moment.js з DatePicker

// Function to generate a random color / Функція для генерації випадкового кольору
const generateRandomColor = () => {
    const getRandomValue = () => Math.floor(Math.random() * 100) + 100; // Generate a random value between 100 and 200 / Генерує випадкове значення між 100 та 200
    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();
    const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`; // Convert to hexadecimal color / Конвертація у шістнадцятковий колір
    return color;
};

const CalendarPage = () => {
    const dispatch = useDispatch(); // Initialize dispatch / Ініціалізація dispatch
    const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from Redux store / Отримуємо завдання з Redux store
    const projects = useSelector((state) => state.projects.projects); // Get projects from Redux store / Отримуємо проєкти з Redux store
    const users = useSelector((state) => state.user.users); // Get users from Redux store / Отримуємо користувачів з Redux store
    const [events, setEvents] = useState([]); // State for calendar events / Стан для подій у календарі
    const { theme } = useContext(ThemeContext); // Get current theme from ThemeContext / Отримати поточну тему з ThemeContext
    const [filter, setFilter] = useState('all'); // State for filter type / Стан для типу фільтру
    const [selectedUser, setSelectedUser] = useState('all'); // State for selected user / Стан для вибраного користувача
    const [startDate, setStartDate] = useState(null); // State for start date / Стан для дати початку
    const [endDate, setEndDate] = useState(null); // State for end date / Стан для дати закінчення
    const [appliedFilter, setAppliedFilter] = useState('all'); // State for applied filter / Стан для застосованого фільтру
    const [appliedUser, setAppliedUser] = useState('all'); // State for applied user filter / Стан для застосованого фільтру користувача
    const [appliedStartDate, setAppliedStartDate] = useState(null); // State for applied start date / Стан для застосованої дати початку
    const [appliedEndDate, setAppliedEndDate] = useState(null); // State for applied end date / Стан для застосованої дати закінчення
    const navigate = useNavigate(); // Hook for navigation / Хук для навігації

    useEffect(() => {
        dispatch(fetchTasks()); // Fetch tasks on component mount / Отримати завдання при монтуванні компонента
        dispatch(fetchProjects()); // Fetch projects on component mount / Отримати проєкти при монтуванні компонента
        dispatch(fetchUsers()); // Fetch users on component mount / Отримати користувачів при монтуванні компонента
        dispatch(fetchUserProfile()); // Fetch user profile on component mount / Отримати профіль користувача при монтуванні компонента
    }, [dispatch]);

    useEffect(() => {
        console.log('Users:', users); // Log users to console / Вивести користувачів у консоль
        console.log('Tasks:', tasks); // Log tasks to console / Вивести завдання у консоль
        console.log('Projects:', projects); // Log projects to console / Вивести проєкти у консоль
    }, [users, tasks, projects]);

    useEffect(() => {
        let taskEvents = [];
        let projectEvents = [];

        // Filtering tasks / Фільтрація завдань
        if (appliedFilter === 'all' || appliedFilter === 'tasks') {
            taskEvents = tasks
                .filter(task => {
                    if (appliedUser !== 'all' && task.assignedTo !== appliedUser) {
                        return false;
                    }
                    const taskStart = moment(task.startDate);
                    const taskEnd = moment(task.endDate);

                    if (appliedStartDate && taskStart.isBefore(moment(appliedStartDate), 'day')) return false;
                    if (appliedEndDate && taskEnd.isAfter(moment(appliedEndDate), 'day')) return false;
                    return true;
                })
                .map(task => ({
                    title: task.title, // Task title / Назва завдання
                    start: moment(task.startDate).format(), // Task start date / Дата початку завдання
                    end: moment(task.endDate).format(), // Task end date / Дата закінчення завдання
                    resourceId: task._id, // Use task._id as resource ID / Використовуємо task._id як ідентифікатор ресурсу
                    backgroundColor: generateRandomColor(), // Set random background color / Встановлюємо випадковий колір фону
                    borderColor: generateRandomColor(), // Set random border color / Встановлюємо випадковий колір межі
                    resourceType: 'task', // Mark as task resource / Позначаємо як ресурс типу завдання
                    allDay: false
                }));
        }

        // Filtering projects / Фільтрація проєктів
        if (appliedFilter === 'all' || appliedFilter === 'projects') {
            projectEvents = projects
                .filter(project => {
                    if (!project.developer) {
                        return false;
                    }
                    if (appliedUser !== 'all' && project.developer._id.toString() !== appliedUser) {
                        return false;
                    }
                    const projectStart = moment(project.startDate);
                    const projectEnd = moment(project.endDate);

                    if (appliedStartDate && projectStart.isBefore(moment(appliedStartDate), 'day')) return false;
                    if (appliedEndDate && projectEnd.isAfter(moment(appliedEndDate), 'day')) return false;
                    return true;
                })
                .map(project => ({
                    title: project.title, // Project title / Назва проєкту
                    start: moment(project.startDate).format(), // Project start date / Дата початку проєкту
                    end: moment(project.endDate).format(), // Project end date / Дата закінчення проєкту
                    resourceId: project._id, // Use project._id as resource ID / Використовуємо project._id як ідентифікатор ресурсу
                    backgroundColor: generateRandomColor(), // Set random background color / Встановлюємо випадковий колір фону
                    borderColor: generateRandomColor(), // Set random border color / Встановлюємо випадковий колір межі
                    resourceType: 'project', // Mark as project resource / Позначаємо як ресурс типу проєкт
                    allDay: false
                }));
        }

        const allEvents = [...taskEvents, ...projectEvents]; // Combine task and project events / Комбінуємо події завдань та проєктів
        console.log('All Events:', allEvents); // Log all events to console / Вивести всі події у консоль
        setEvents(allEvents); // Set events state / Встановити стан подій
    }, [tasks, projects, appliedFilter, appliedUser, appliedStartDate, appliedEndDate]);

    // Apply filters to the events / Застосування фільтрів до подій
    const applyFilters = () => {
        setAppliedFilter(filter);
        setAppliedUser(selectedUser);
        setAppliedStartDate(startDate);
        setAppliedEndDate(endDate);
    };

    // Handle event click for navigation / Обробка кліку по події для навігації
    const handleEventClick = (clickInfo) => {
        if (clickInfo.event.extendedProps.resourceType === 'task') {
            navigate(`/tasks/${clickInfo.event.extendedProps.resourceId}`); // Navigate to task details / Перехід до деталей завдання
        } else if (clickInfo.event.extendedProps.resourceType === 'project') {
            navigate(`/projects/${clickInfo.event.extendedProps.resourceId}`); // Navigate to project details / Перехід до деталей проєкту
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}> {/* Set localization for date picker / Встановити локалізацію для вибору дати */}
            <Box sx={{ padding: 3, backgroundColor: theme === 'dark' ? '#303030' : '#f7f7f7', borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 'bold', color: theme === 'dark' ? '#90caf9' : '#4A90E2' }}
                >
                    Project & Task Calendar {/* Page title / Заголовок сторінки */}
                </Typography>

                {/* Filters section / Секція фільтрів */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Filter</InputLabel> {/* Label for filter select / Мітка для вибору фільтра */}
                        <Select value={filter} onChange={(e) => setFilter(e.target.value)}> {/* Select input for filtering / Вибір для фільтрації */}
                            <MenuItem value="all">All</MenuItem> {/* Filter option for all items / Опція фільтра для всіх елементів */}
                            <MenuItem value="tasks">Tasks</MenuItem> {/* Filter option for tasks only / Опція фільтра лише для завдань */}
                            <MenuItem value="projects">Projects</MenuItem> {/* Filter option for projects only / Опція фільтра лише для проєктів */}
                        </Select>
                    </FormControl>

                    {/* User Filter */}
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Assigned To</InputLabel> {/* Label for user filter / Мітка для фільтра по користувачам */}
                        <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}> {/* Select input for user filtering / Вибір для фільтрації по користувачам */}
                            <MenuItem value="all">All Users</MenuItem> {/* Filter option for all users / Опція фільтра для всіх користувачів */}
                            {users.map(user => (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.username} {/* Display user's username / Відображення імені користувача */}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Date Filters */}
                    <DatePicker
                        label="Start Date"
                        value={startDate} // Bind start date state / Прив'язка стану дати початку
                        onChange={setStartDate} // Handle start date change / Обробка зміни дати початку
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <DatePicker
                        label="End Date"
                        value={endDate} // Bind end date state / Прив'язка стану дати закінчення
                        onChange={setEndDate} // Handle end date change / Обробка зміни дати закінчення
                        renderInput={(params) => <TextField {...params} />}
                    />

                    {/* Apply Filters Button */}
                    <Button variant="contained" onClick={applyFilters}>Apply Filters</Button> {/* Button to apply filters / Кнопка для застосування фільтрів */}
                </Box>

                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, backgroundColor: theme === 'dark' ? '#424242' : '#fff' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]} // Plugins for FullCalendar / Плагіни для FullCalendar
                        initialView="dayGridMonth" // Set initial view to month grid / Встановити початковий вигляд на місячну сітку
                        events={events} // Events to display on the calendar / Події для відображення у календарі
                        eventClick={handleEventClick} // Handle event click / Обробка кліку по події
                        headerToolbar={{ // Define the toolbar options / Визначення опцій панелі інструментів
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,listWeek,listDay'
                        }}
                        views={{ // Define the views and their button texts / Визначення виглядів та їх текстів кнопок
                            listWeek: { buttonText: 'week' },
                            listDay: { buttonText: 'day' }
                        }}
                        selectable={true} // Allow selection on the calendar / Дозволити вибір на календарі
                        height="80vh" // Set height for the calendar / Встановити висоту для календаря
                        eventContent={(eventInfo) => ( // Custom event content / Користувацький вміст події
                            <div
                                style={{
                                    padding: '5px',
                                    borderRadius: '5px',
                                    backgroundColor: eventInfo.event.backgroundColor,
                                    cursor: 'pointer' // Change cursor on hover / Змінити курсор при наведенні
                                }}
                            >
                                <b>{eventInfo.timeText}</b> {/* Display event time / Відображення часу події */}
                                <div>{eventInfo.event.title}</div> {/* Display event title / Відображення назви події */}
                            </div>
                        )}
                    />
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default CalendarPage; // Export the CalendarPage component / Експорт компонента CalendarPage
