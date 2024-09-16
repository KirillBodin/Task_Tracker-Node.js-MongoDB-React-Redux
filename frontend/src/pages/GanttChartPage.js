import React, { useEffect, useState } from 'react'; // Import React and hooks / Імпорт React та хуків
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for dispatching actions and selecting state / Імпорт хуків для відправлення дій та вибору стану
import { Chart } from 'react-google-charts'; // Import Google Charts for rendering Gantt chart / Імпорт Google Charts для відображення діаграми Ганта
import { fetchProjects } from '../redux/projectSlice'; // Import action for fetching projects / Імпорт дії для отримання проєктів
import { fetchTasks } from '../redux/taskSlice'; // Import action for fetching tasks / Імпорт дії для отримання завдань
import { useNavigate } from 'react-router-dom'; // Import hook for navigation / Імпорт хука для навігації
import { Box, Select, MenuItem, TextField, Button, Typography, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { format } from 'date-fns'; // Import date-fns for date formatting / Імпорт date-fns для форматування дат

const GanttChartPage = () => {
    const dispatch = useDispatch(); // Initialize dispatch / Ініціалізація dispatch
    const projects = useSelector((state) => state.projects.projects); // Get projects from Redux store / Отримуємо проєкти з Redux store
    const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from Redux store / Отримуємо завдання з Redux store
    const navigate = useNavigate(); // Hook for navigation / Хук для навігації

    const [selectedProject, setSelectedProject] = useState(''); // State for selected project / Стан для вибраного проєкту
    const [startDate, setStartDate] = useState(''); // State for start date filter / Стан для фільтру дати початку
    const [endDate, setEndDate] = useState(''); // State for end date filter / Стан для фільтру дати закінчення

    useEffect(() => {
        dispatch(fetchProjects()); // Fetch projects on component mount / Отримати проєкти при монтуванні компонента
        dispatch(fetchTasks()); // Fetch tasks on component mount / Отримати завдання при монтуванні компонента
    }, [dispatch]);

    // Calculate completion percentage for a project / Обчислення відсотка завершення проєкту
    const calculateCompletionPercentage = (projectId) => {
        const projectTasks = tasks.filter((task) => task.project && task.project._id.toString() === projectId.toString()); // Filter tasks for the project / Фільтруємо завдання для проєкту
        if (projectTasks.length === 0) return 0; // Return 0 if no tasks / Повертаємо 0, якщо завдань немає

        const completedTasks = projectTasks.filter((task) => task.status === 'Done'); // Count completed tasks / Підрахунок завершених завдань
        return Math.round((completedTasks.length / projectTasks.length) * 100); // Calculate percentage / Обчислення відсотка
    };

    // Filter projects based on selected filters / Фільтрація проєктів на основі вибраних фільтрів
    const filteredProjects = projects.filter((project) => {
        const projectStart = new Date(project.startDate); // Convert project start date to Date object / Перетворення дати початку проєкту на об'єкт Date
        const projectEnd = new Date(project.endDate); // Convert project end date to Date object / Перетворення дати закінчення проєкту на об'єкт Date
        const filterStart = startDate ? new Date(startDate) : null; // Convert filter start date to Date object if it exists / Перетворення дати початку фільтру на об'єкт Date, якщо існує
        const filterEnd = endDate ? new Date(endDate) : null; // Convert filter end date to Date object if it exists / Перетворення дати закінчення фільтру на об'єкт Date, якщо існує

        const matchesDateRange =
            (!filterStart || projectEnd >= filterStart) &&
            (!filterEnd || projectStart <= filterEnd); // Check if project falls within the date range / Перевірка, чи входить проєкт у діапазон дат

        return matchesDateRange && (!selectedProject || project._id === selectedProject); // Check if project matches selected filters / Перевірка, чи відповідає проєкт вибраним фільтрам
    });

    // Filter tasks based on selected filters / Фільтрація завдань на основі вибраних фільтрів
    const filteredTasks = tasks.filter((task) => {
        const taskStart = new Date(task.startDate); // Convert task start date to Date object / Перетворення дати початку завдання на об'єкт Date
        const taskEnd = new Date(task.endDate); // Convert task end date to Date object / Перетворення дати закінчення завдання на об'єкт Date
        const filterStart = startDate ? new Date(startDate) : null;
        const filterEnd = endDate ? new Date(endDate) : null;

        const matchesDateRange =
            (!filterStart || taskEnd >= filterStart) &&
            (!filterEnd || taskStart <= filterEnd); // Check if task falls within the date range / Перевірка, чи входить завдання у діапазон дат

        return matchesDateRange && (!selectedProject || task.project._id === selectedProject); // Check if task matches selected filters / Перевірка, чи відповідає завдання вибраним фільтрам
    });

    // Prepare data for Gantt chart / Підготовка даних для діаграми Ганта
    const ganttData = [
        [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent done' },
            { type: 'string', label: 'Dependencies' },
            { type: 'string', label: 'Additional Data' }, // Additional field for extra data / Додаткове поле для виведення даних
        ],
        ...filteredProjects.map((project) => [
            project._id,
            `${project.title}: ${format(new Date(project.startDate), 'dd MMM yyyy')} - ${format(new Date(project.endDate), 'dd MMM yyyy')}`,
            'Project',
            new Date(project.startDate),
            new Date(project.endDate),
            null,
            calculateCompletionPercentage(project._id),
            null,
            `Created by ${project.createdBy} on ${format(new Date(project.createdAt), 'dd MMM yyyy')}`, // Additional information / Додаткова інформація
        ]),
        ...filteredTasks.map((task) => [
            task._id,
            `${task.title}: ${format(new Date(task.startDate), 'dd MMM yyyy')} - ${format(new Date(task.endDate), 'dd MMM yyyy')}`,
            'Task',
            new Date(task.startDate),
            new Date(task.endDate),
            null,
            task.status === 'Done' ? 100 : 0,
            null,
            `Last updated: ${format(new Date(task.updatedAt), 'dd MMM yyyy')}`, // Additional information / Додаткова інформація
        ]),
    ];

    // Handle chart selection / Обробка вибору в діаграмі
    const handleChartSelect = (chartWrapper) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection(); // Get the selected chart item / Отримати вибраний елемент діаграми
        if (selection.length > 0) {
            const { row } = selection[0]; // Get the selected row / Отримати вибраний рядок
            const taskOrProjectId = ganttData[row + 1][0]; // Get ID of selected item / Отримати ідентифікатор вибраного елемента
            const isProject = ganttData[row + 1][2] === 'Project'; // Check if it's a project / Перевірка, чи це проєкт

            if (isProject) {
                navigate(`/projects/${taskOrProjectId}`); // Navigate to project details / Перехід до деталей проєкту
            } else {
                navigate(`/tasks/${taskOrProjectId}`); // Navigate to task details / Перехід до деталей завдання
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
            <Typography
                variant="h4"
                sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 'bold', color: '#4A90E2' }}
            >
                Gantt Chart {/* Page title / Заголовок сторінки */}
            </Typography>

            {/* Filter controls / Контролі фільтру */}
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 3, display: 'flex', gap: 2 }}>
                <Select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)} // Update selected project / Оновлення вибраного проєкту
                    displayEmpty
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">
                        <em>All Projects</em> {/* Option for all projects / Опція для всіх проєктів */}
                    </MenuItem>
                    {projects.map((project) => (
                        <MenuItem key={project._id} value={project._id}>
                            {project.title} {/* Display project title / Відображення назви проєкту */}
                        </MenuItem>
                    ))}
                </Select>

                {/* Start Date Filter / Фільтр дати початку */}
                <TextField
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} // Update start date filter / Оновлення фільтру дати початку
                    sx={{ flex: 1 }}
                />

                {/* End Date Filter / Фільтр дати закінчення */}
                <TextField
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} // Update end date filter / Оновлення фільтру дати закінчення
                    sx={{ flex: 1 }}
                />

                {/* Reset Filters Button / Кнопка скидання фільтрів */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setStartDate(''); // Reset start date / Скидання дати початку
                        setEndDate(''); // Reset end date / Скидання дати закінчення
                        setSelectedProject(''); // Reset selected project / Скидання вибраного проєкту
                    }}
                    sx={{ backgroundColor: '#4A90E2', height: 'fit-content' }}
                >
                    Reset Filters
                </Button>
            </Paper>

            {/* Render Gantt chart / Відображення діаграми Ганта */}
            <Chart
                chartType="Gantt" // Set chart type to Gantt / Встановити тип діаграми Ганта
                width="100%"
                height="50vh"
                data={ganttData} // Data to display in the chart / Дані для відображення на діаграмі
                options={{
                    gantt: {
                        criticalPathEnabled: true, // Enable critical path / Увімкнути критичний шлях
                        criticalPathStyle: {
                            stroke: '#e64a19', // Color for critical path / Колір для критичного шляху
                            strokeWidth: 2, // Width of the critical path line / Ширина лінії критичного шляху
                        },
                    },
                    tooltip: { isHtml: true }, // Enable HTML tooltips / Увімкнути HTML підказки
                    hAxis: {
                        format: 'dd.MM.yyyy', // Date format for horizontal axis / Формат дати для горизонтальної осі
                    },
                }}
                chartEvents={[
                    {
                        eventName: 'select', // Event triggered on selection / Подія, що викликається при виборі
                        callback: ({ chartWrapper }) => handleChartSelect(chartWrapper), // Handle selection event / Обробка події вибору
                    },
                ]}
            />
        </Box>
    );
};

export default GanttChartPage; // Export GanttChartPage component / Експорт компонента GanttChartPage
