import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TaskManagementPage from './pages/TaskManagementPage';
import AssignProjectsPage from './pages/AssignProjectsPage';
import KanbanBoardPage from './pages/KanbanBoardPage';
import SideNavBar from './components/SideNavBar';
import TopNavBar from './components/TopNavBar';
import AuthChoice from "./pages/AuthChoice";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";

import TasksByStatusPage from './pages/TasksByStatusPage';
import UserProfilePage from './pages/UserProfilePage';
import axios from 'axios';
import { Box, CssBaseline } from '@mui/material';
import GanttChartPage from './pages/GanttChartPage';
import ActivityBoardPage from './pages/ActivityBoardPage';
import DashboardPage from './pages/DashboardPage';
import ProjectStatusReportPage from './pages/ProjectStatusReportPage';
import TaskCompletionReportPage from './pages/TaskCompletionReportPage';
import CalendarPage from './pages/CalendarPage';
import ProjectsPage from './pages/ProjectsPage';
import NotificationList from './components/NotificationList';
import Reports from './components/Reports';
import TaskDetail from "./pages/TaskDetail";

function App() {
    // State to track if the user is authenticated
    // Стан для відстеження, чи авторизований користувач
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if there is a token in localStorage when the component mounts
        // Перевірка наявності токена в localStorage при завантаженні компонента
        const token = localStorage.getItem('token');
        if (token) {
            // If a token exists, set it as the default authorization header for axios
            // Якщо токен існує, встановлюємо його як заголовок авторизації за замовчуванням для axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);  // Set authentication state to true
            // Встановлюємо стан авторизації в true
        }
    }, []);

    return (
        <Box
            sx={{
                display: 'flex', // Set the layout to flexbox
                // Встановлюємо макет flexbox
                flexDirection: 'column', // Arrange items in a column
                // Розташування елементів у колонку
                minHeight: '100vh', // Make the box take at least the full viewport height
                // Мінімальна висота - повна висота вікна перегляду
                bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Background gradient color
                // Градієнт кольору фону
                color: 'white', // Set the text color to white
                // Встановлюємо білий колір тексту
                fontFamily: 'Arial, sans-serif', // Set the font family
                // Встановлюємо шрифт
            }}
        >
            <CssBaseline /> {/* A component to remove the default browser styling */}
            {/* Компонент для видалення стилів за замовчуванням у браузері */}
            {isAuthenticated && (
                <TopNavBar
                    onLogout={() => setIsAuthenticated(false)} // Callback to handle logout
                    // Зворотний виклик для обробки виходу з системи
                    sx={{
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adding shadow for depth effect
                        // Додаємо тінь для ефекту глибини
                        bgcolor: '#ffffff1a', // Semi-transparent background
                        // Напівпрозорий фон
                        backdropFilter: 'blur(10px)', // Apply a blur effect to the background
                        // Застосування ефекту розмиття до фону
                    }}
                />
            )}
            <Box sx={{ display: 'flex', flex: 1 }}> {/* Main container */}
                {/* Головний контейнер */}
                {isAuthenticated && (
                    <SideNavBar
                        sx={{
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adding shadow for depth effect
                            // Додаємо тінь для ефекту глибини
                            bgcolor: '#00000080', // Semi-transparent black background
                            // Напівпрозорий чорний фон
                        }}
                    />
                )}
                <Box
                    sx={{
                        flex: 1, // This box takes up the remaining space
                        // Цей блок займає залишковий простір
                        padding: '24px', // Add padding for spacing
                        // Додаємо відступи для відступів
                        overflowY: 'auto', // Enable vertical scrolling
                        // Включення вертикальної прокрутки
                        bgcolor: '#ffffff1a', // Semi-transparent background
                        // Напівпрозорий фон
                        color: 'white', // Set text color to white
                        // Встановлюємо білий колір тексту
                        backdropFilter: 'blur(10px)', // Apply a blur effect to the background
                        // Застосування ефекту розмиття до фону
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Adding shadow for depth effect
                        // Додаємо тінь для ефекту глибини
                        borderRadius: '8px', // Round the corners
                        // Закруглення кутів
                    }}
                >
                    <Routes> {/* Define the routes for the application */}
                        {/* Визначення маршрутів для програми */}
                        {isAuthenticated ? ( // If the user is authenticated
                            // Якщо користувач авторизований
                            <>
                                {/* Define routes for authenticated users */}
                                {/* Визначення маршрутів для авторизованих користувачів */}
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                                <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                                <Route path="/projects" element={<ProjectsPage />} />
                                <Route path="/task-management" element={<TaskManagementPage />} />
                                <Route path="/assign-projects" element={<AssignProjectsPage />} />
                                <Route path="/kanban-board" element={<KanbanBoardPage />} />
                                <Route path="/tasks/status/:status" element={<TasksByStatusPage />} />
                                <Route path="/profile" element={<UserProfilePage />} />
                                <Route path="/gantt-chart" element={<GanttChartPage />} />
                                <Route path="/logout" element={<LoginForm />} />
                                <Route path="/activity-board" element={<ActivityBoardPage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/reports/projects" element={<ProjectStatusReportPage />} />
                                <Route path="/reports/tasks" element={<TaskCompletionReportPage />} />
                                <Route path="/calendar" element={<CalendarPage />} />
                                <Route path="/notifications" element={<NotificationList />} />
                                <Route path="/reports" element={<Reports />} />
                                <Route path="/tasks/:id" element={<TaskDetail />} />
                            </>
                        ) : (
                            // If the user is not authenticated
                            // Якщо користувач не авторизований
                            <>
                                {/* Define routes for non-authenticated users */}
                                {/* Визначення маршрутів для неавторизованих користувачів */}
                                <Route path="/" element={<Navigate to="/auth" />} />
                                <Route path="/auth" element={<AuthChoice />} />
                                <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
                                <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                            </>
                        )}
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}

export default App;
