import React, { useState } from 'react'; // Import React and useState for managing state / Імпорт React та useState для управління станом
import { Link } from 'react-router-dom'; // Import Link for navigation between routes / Імпорт Link для навігації між маршрутами
import { List, ListItem, ListItemText, Box, Collapse } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import icons / Імпорт іконок
import DoneIcon from '@mui/icons-material/Done';
import InProgressIcon from '@mui/icons-material/Loop';
import BacklogIcon from '@mui/icons-material/AssignmentLate';
import ReviewIcon from '@mui/icons-material/RateReview';
import KanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListIcon from '@mui/icons-material/List'; // Icon for All Tasks / Іконка для All Tasks
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles'; // Import useTheme to access the current theme / Імпорт useTheme для доступу до поточної теми
import { motion } from 'framer-motion'; // Import framer-motion for animations / Імпорт framer-motion для анімацій

const SideNavBar = () => {
    const theme = useTheme(); // Get the current theme for styling / Отримати поточну тему для стилізації
    const [openTasks, setOpenTasks] = useState(false); // State to handle the collapse of the tasks submenu / Стан для керування розкриванням підменю задач

    const handleTasksClick = () => {
        setOpenTasks(!openTasks); // Toggle the state for the tasks submenu / Перемикання стану для підменю задач
    };

    return (
        <Box
            sx={{
                width: 250, // Set the width of the side navigation / Встановлення ширини бокової навігації
                bgcolor: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)', // Gradient background color / Градієнтний фон
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Box shadow for depth effect / Тінь для ефекту глибини
                borderRadius: '10px', // Rounded corners / Закруглені кути
                color: theme.palette.text.primary, // Text color from theme / Колір тексту з теми
                overflowY: 'auto', // Enable vertical scrolling if needed / Увімкнути вертикальне прокручування за потреби
                padding: '10px', // Inner padding / Внутрішні відступи
            }}
        >
            <List component="nav"> {/* Navigation list container / Контейнер списку навігації */}
                <ListItem
                    button
                    component={Link} // Use Link for navigation / Використання Link для навігації
                    to="/dashboard" // Route for dashboard / Маршрут для dashboard
                    sx={{
                        transition: 'background 0.3s ease', // Smooth transition on hover / Плавний перехід при наведенні
                        '&:hover': {
                            backgroundColor: '#FF8E53', // Change background color on hover / Зміна кольору фону при наведенні
                            color: '#fff', // Change text color on hover / Зміна кольору тексту при наведенні
                            transform: 'scale(1.05)', // Scale up effect on hover / Ефект збільшення при наведенні
                        },
                    }}
                >
                    <DashboardIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Dashboard / Іконка для Dashboard */}
                    <ListItemText primary="Dashboard" sx={{ color: theme.palette.text.primary }} /> {/* Text for Dashboard link / Текст для посилання Dashboard */}
                </ListItem>

                {/* List item for Projects */}
                {/* Елемент списку для Projects */}
                <ListItem
                    button
                    component={Link}
                    to="/projects"
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <BarChartIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Projects / Іконка для Projects */}
                    <ListItemText primary="All Projects" sx={{ color: theme.palette.text.primary }} /> {/* Text for Projects link / Текст для посилання Projects */}
                </ListItem>

                {/* Task items with collapsible submenu */}
                {/* Пункти задач з розкривним підменю */}
                <ListItem
                    button
                    onClick={handleTasksClick} // Handle click to toggle submenu / Обробка кліку для перемикання підменю
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <BarChartIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Tasks / Іконка для Tasks */}
                    <ListItemText primary="Tasks" sx={{ color: theme.palette.text.primary }} /> {/* Text for Tasks link / Текст для посилання Tasks */}
                    {openTasks ? <ExpandLess /> : <ExpandMore />} {/* Toggle icon based on state / Іконка перемикання на основі стану */}
                </ListItem>

                <Collapse in={openTasks} timeout="auto" unmountOnExit> {/* Collapsible container for task items / Розкривний контейнер для пунктів задач */}
                    <List component="div" disablePadding>
                        {/* List item for All Tasks */}
                        {/* Елемент списку для All Tasks */}
                        <ListItem
                            button
                            component={Link}
                            to="/tasks/status/All"
                            sx={{
                                pl: 4, // Indentation for submenu items / Відступ для підменю
                                transition: 'background 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#FF8E53',
                                    color: '#fff',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <ListIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for All Tasks / Іконка для All Tasks */}
                            <ListItemText primary="All Tasks" sx={{ color: theme.palette.text.primary }} /> {/* Text for All Tasks link / Текст для посилання All Tasks */}
                        </ListItem>

                        {/* List item for Backlog Tasks */}
                        {/* Елемент списку для Backlog Tasks */}
                        <ListItem
                            button
                            component={Link}
                            to="/tasks/status/Backlog"
                            sx={{
                                pl: 4,
                                transition: 'background 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#FF8E53',
                                    color: '#fff',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <BacklogIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Backlog Tasks / Іконка для Backlog Tasks */}
                            <ListItemText primary="Backlog Tasks" sx={{ color: theme.palette.text.primary }} /> {/* Text for Backlog Tasks link / Текст для посилання Backlog Tasks */}
                        </ListItem>

                        {/* List item for In Progress Tasks */}
                        {/* Елемент списку для In Progress Tasks */}
                        <ListItem
                            button
                            component={Link}
                            to="/tasks/status/In_Progress"
                            sx={{
                                pl: 4,
                                transition: 'background 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#FF8E53',
                                    color: '#fff',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <InProgressIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for In Progress Tasks / Іконка для In Progress Tasks */}
                            <ListItemText primary="In Progress Tasks" sx={{ color: theme.palette.text.primary }} /> {/* Text for In Progress Tasks link / Текст для посилання In Progress Tasks */}
                        </ListItem>

                        {/* List item for Done Tasks */}
                        {/* Елемент списку для Done Tasks */}
                        <ListItem
                            button
                            component={Link}
                            to="/tasks/status/Done"
                            sx={{
                                pl: 4,
                                transition: 'background 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#FF8E53',
                                    color: '#fff',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <DoneIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Done Tasks / Іконка для Done Tasks */}
                            <ListItemText primary="Done Tasks" sx={{ color: theme.palette.text.primary }} /> {/* Text for Done Tasks link / Текст для посилання Done Tasks */}
                        </ListItem>

                        {/* List item for Review Tasks */}
                        {/* Елемент списку для Review Tasks */}
                        <ListItem
                            button
                            component={Link}
                            to="/tasks/status/Review"
                            sx={{
                                pl: 4,
                                transition: 'background 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#FF8E53',
                                    color: '#fff',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <ReviewIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Review Tasks / Іконка для Review Tasks */}
                            <ListItemText primary="Review Tasks" sx={{ color: theme.palette.text.primary }} /> {/* Text for Review Tasks link / Текст для посилання Review Tasks */}
                        </ListItem>
                    </List>
                </Collapse>

                {/* List item for Kanban Board */}
                {/* Елемент списку для Kanban Board */}
                <ListItem
                    button
                    component={Link}
                    to="/kanban-board"
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <KanbanIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Kanban Board / Іконка для Kanban Board */}
                    <ListItemText primary="Kanban Board" sx={{ color: theme.palette.text.primary }} /> {/* Text for Kanban Board link / Текст для посилання Kanban Board */}
                </ListItem>

                {/* List item for Calendar */}
                {/* Елемент списку для Calendar */}
                <ListItem
                    button
                    component={Link}
                    to="/calendar"
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <CalendarTodayIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Calendar / Іконка для Calendar */}
                    <ListItemText primary="Calendar" sx={{ color: theme.palette.text.primary }} /> {/* Text for Calendar link / Текст для посилання Calendar */}
                </ListItem>

                {/* List item for Gantt Chart */}
                {/* Елемент списку для Gantt Chart */}
                <ListItem
                    button
                    component={Link}
                    to="/gantt-chart"
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <BarChartIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Gantt Chart / Іконка для Gantt Chart */}
                    <ListItemText primary="Gantt Chart" sx={{ color: theme.palette.text.primary }} /> {/* Text for Gantt Chart link / Текст для посилання Gantt Chart */}
                </ListItem>

                {/* List item for Activity Board */}
                {/* Елемент списку для Activity Board */}
                <ListItem
                    button
                    component={Link}
                    to="/activity-board"
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <NotificationsIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Activity Board / Іконка для Activity Board */}
                    <ListItemText primary="Activity Board" sx={{ color: theme.palette.text.primary }} /> {/* Text for Activity Board link / Текст для посилання Activity Board */}
                </ListItem>

                {/* List item for Notifications */}
                {/* Елемент списку для Notifications */}
                <ListItem
                    button
                    component={Link}
                    to="/notifications"
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <NotificationsIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Notifications / Іконка для Notifications */}
                    <ListItemText primary="Notifications" sx={{ color: theme.palette.text.primary }} /> {/* Text for Notifications link / Текст для посилання Notifications */}
                </ListItem>

                {/* List item for Reports */}
                {/* Елемент списку для Reports */}
                <ListItem
                    button
                    component={Link}
                    to="/reports"
                    sx={{
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8E53',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <BarChartIcon sx={{ marginRight: 1, color: theme.palette.text.primary }} /> {/* Icon for Reports / Іконка для Reports */}
                    <ListItemText primary="Reports" sx={{ color: theme.palette.text.primary }} /> {/* Text for Reports link / Текст для посилання Reports */}
                </ListItem>
            </List>
        </Box>
    );
};

export default SideNavBar; // Export the SideNavBar component / Експорт компонента SideNavBar
