import React, { useEffect, useState } from 'react'; // Import necessary hooks from React / Імпорт необхідних хуків з React
import { useDispatch, useSelector } from 'react-redux'; // Import hooks to interact with the Redux store / Імпорт хуків для взаємодії з Redux store
import { useNavigate } from 'react-router-dom'; // Import navigation hook / Імпорт хука для навігації
import { fetchTasks, updateTask } from '../redux/taskSlice'; // Import actions for fetching and updating tasks / Імпорт дій для отримання та оновлення завдань
import { fetchProjects } from '../redux/projectSlice'; // Import action for fetching projects / Імпорт дії для отримання проєктів
import TaskCard from '../components/TaskCard'; // Import TaskCard component / Імпорт компонента TaskCard
import { Box, Grid, Typography, Select, MenuItem, Paper } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { DndProvider, useDrag, useDrop } from 'react-dnd'; // Import drag-and-drop utilities / Імпорт утиліт для drag-and-drop
import { HTML5Backend } from 'react-dnd-html5-backend'; // Use HTML5 backend for drag-and-drop / Використання HTML5 backend для drag-and-drop
import { useTheme } from '@mui/material/styles'; // Import theme hook / Імпорт хука для тем

// Define item types for drag-and-drop / Визначення типів елементів для drag-and-drop
const ItemTypes = {
    TASK: 'task',
};

// DraggableTaskCard component for rendering draggable tasks / Компонент DraggableTaskCard для відображення перетаскуваних завдань
const DraggableTaskCard = ({ task, onTaskClick }) => {
    // Use useDrag hook to make the task draggable / Використання хука useDrag для перетягування завдання
    const [, ref] = useDrag({
        type: ItemTypes.TASK, // Define item type as 'task' / Визначаємо тип елемента як 'task'
        item: { id: task._id, status: task.status }, // Attach task ID and status to the item / Прикріплюємо ID і статус завдання до елемента
    });

    return (
        <Paper
            ref={ref} // Attach ref for drag-and-drop functionality / Прикріплюємо ref для функціональності drag-and-drop
            elevation={3}
            sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: '8px',
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease',
                cursor: 'pointer', // Make the cursor a pointer to indicate it's clickable / Робимо курсор у вигляді руки, щоб вказати, що елемент клікабельний
                '&:hover': {
                    transform: 'scale(1.02)', // Slightly enlarge on hover / Легке збільшення при наведенні
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                },
            }}
            onClick={() => onTaskClick(task._id)} // Navigate to task detail page on click / Переходимо на сторінку деталей завдання при кліку
        >
            <TaskCard task={task} /> {/* Render TaskCard component / Відображення компонента TaskCard */}
        </Paper>
    );
};

// DroppableColumn component to display a status column and accept dropped tasks / Компонент DroppableColumn для відображення колонки статусу і прийняття перетасканих завдань
const DroppableColumn = ({ status, tasks, onDropTask, color, onTaskClick }) => {
    // Use useDrop hook to allow tasks to be dropped into the column / Використання хука useDrop для прийняття завдань у колонку
    const [, ref] = useDrop({
        accept: ItemTypes.TASK, // Accept only items of type 'task' / Приймаємо лише елементи типу 'task'
        drop: (item) => onDropTask(item.id, status), // Handle the drop event and update task status / Обробляємо подію drop і оновлюємо статус завдання
    });

    return (
        <Box
            ref={ref} // Attach ref to enable drop functionality / Прикріплюємо ref для увімкнення функції drop
            sx={{
                minHeight: '200px',
                bgcolor: color, // Set the background color based on the status / Встановлюємо колір фону залежно від статусу
                padding: 2,
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: '#fff', // Set text color to white / Встановлюємо білий колір тексту
                    fontWeight: 'bold',
                    marginBottom: 2,
                }}
            >
                {status} {/* Display the status / Відображення статусу */}
            </Typography>
            {tasks.map((task) => ( // Loop through tasks and render DraggableTaskCard for each / Перебираємо завдання і відображаємо DraggableTaskCard для кожного
                <DraggableTaskCard key={task._id} task={task} onTaskClick={onTaskClick} /> // Pass onTaskClick to handle navigation / Передаємо onTaskClick для обробки навігації
            ))}
        </Box>
    );
};

// KanbanBoardPage component to display the Kanban board / Компонент KanbanBoardPage для відображення Канбан дошки
const KanbanBoardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigating to other pages / Хук для навігації на інші сторінки
    const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from Redux store / Отримуємо завдання з Redux store
    const projects = useSelector((state) => state.projects.projects); // Get projects from Redux store / Отримуємо проєкти з Redux store
    const [selectedProject, setSelectedProject] = useState(''); // State to hold selected project / Стан для збереження вибраного проєкту
    const theme = useTheme(); // Use theme hook to access theme colors / Використовуємо хук теми для доступу до кольорів теми

    // Fetch tasks and projects when the component mounts / Отримуємо завдання і проєкти при монтуванні компонента
    useEffect(() => {
        dispatch(fetchTasks()); // Dispatch action to fetch tasks / Відправляємо дію для отримання завдань
        dispatch(fetchProjects()); // Dispatch action to fetch projects / Відправляємо дію для отримання проєктів
    }, [dispatch]);

    // Filter tasks by the selected project / Фільтруємо завдання за вибраним проєктом
    const filteredTasks = selectedProject
        ? tasks.filter((task) => task.project && task.project._id === selectedProject) // Show tasks from the selected project / Показуємо завдання з вибраного проєкту
        : tasks; // Show all tasks if no project is selected / Показуємо всі завдання, якщо проєкт не вибраний

    // Handle project selection / Обробка вибору проєкту
    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value); // Update the selected project state / Оновлюємо стан вибраного проєкту
    };

    // Handle task drop event and update the task's status / Обробка події drop і оновлення статусу завдання
    const handleDropTask = (taskId, newStatus) => {
        const task = tasks.find((task) => task._id === taskId); // Find the task being dropped / Знаходимо завдання, яке перетягнули
        if (task) {
            const updatedTask = { ...task, status: newStatus }; // Update the task's status / Оновлюємо статус завдання
            dispatch(updateTask({ id: task._id, updatedTask })).then(() => {
                const updatedTasks = tasks.map(t => t._id === taskId ? updatedTask : t); // Update tasks in the store / Оновлюємо завдання в store
                dispatch({ type: 'tasks/setTasks', payload: updatedTasks }); // Dispatch action to update the tasks in the Redux store / Відправляємо дію для оновлення завдань у Redux store
            });
        }
    };

    // Handle task click to navigate to the task detail page / Обробка кліку по завданню для переходу на сторінку деталей завдання
    const handleTaskClick = (taskId) => {
        navigate(`/tasks/${taskId}`); // Navigate to the task detail page / Переходимо на сторінку деталей завдання
    };

    const statuses = ['Backlog', 'In_progress', 'Review', 'Done']; // Define task statuses / Визначаємо статуси завдань
    const statusColors = {
        Backlog: theme.palette.warning.main, // Color for 'Backlog' status / Колір для статусу 'Backlog'
        In_progress: theme.palette.info.main, // Color for 'In Progress' status / Колір для статусу 'In Progress'
        Review: theme.palette.secondary.main, // Color for 'Review' status / Колір для статусу 'Review'
        Done: theme.palette.success.main, // Color for 'Done' status / Колір для статусу 'Done'
    };

    // Group tasks by their status / Групуємо завдання за їх статусом
    const tasksByStatus = statuses.reduce((acc, status) => {
        acc[status] = filteredTasks.filter((task) => task.status === status); // Group tasks by status / Групуємо завдання за статусом
        return acc;
    }, {});

    return (
        <DndProvider backend={HTML5Backend}> {/* Enable drag-and-drop functionality using HTML5 backend / Увімкнення функції drag-and-drop за допомогою HTML5 backend */}
            <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 3 }}>
                <Typography variant="h4" gutterBottom>Kanban Board</Typography> {/* Display the title of the page / Відображення заголовку сторінки */}
                <Select
                    value={selectedProject}
                    onChange={handleProjectChange} // Handle project selection change / Обробка зміни вибору проєкту
                    displayEmpty
                    fullWidth
                    sx={{ marginBottom: 2, bgcolor: 'background.paper', color: 'text.primary' }}
                >
                    <MenuItem value="">
                        <em>Select Project</em> {/* Display placeholder text / Відображення тексту-заповнювача */}
                    </MenuItem>
                    {projects.map((project) => (
                        <MenuItem key={project._id} value={project._id}>
                            {project.title} {/* Display project title / Відображення назви проєкту */}
                        </MenuItem>
                    ))}
                </Select>

                {/* Render columns for each task status / Відображення колонок для кожного статусу завдання */}
                <Grid container spacing={3}>
                    {statuses.map((status) => (
                        <Grid item xs={12} sm={6} md={3} key={status}>
                            <DroppableColumn
                                status={status} // Pass the status to the column / Передаємо статус колонці
                                tasks={tasksByStatus[status]} // Pass tasks to the column / Передаємо завдання колонці
                                onDropTask={handleDropTask} // Pass the drop handler / Передаємо обробник drop
                                color={statusColors[status]} // Pass the color based on status / Передаємо колір залежно від статусу
                                onTaskClick={handleTaskClick} // Pass the click handler / Передаємо обробник кліку
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </DndProvider>
    );
};

export default KanbanBoardPage; // Export the KanbanBoardPage component / Експорт компонента KanbanBoardPage
