// Імпортуємо функції для налаштування сховища з @reduxjs/toolkit
// Import functions to configure the store from @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// Імпортуємо редюсери для проєктів, задач, користувачів, активності та сповіщень
// Import reducers for projects, tasks, users, activities, and notifications
import projectReducer from './projectSlice';
import taskReducer from './taskSlice'; // Імпортуємо редюсер для задач / Import the task reducer
import userReducer from './userSlice';
import activityReducer from './activitySlice';
import notificationReducer from './notificationSlice';

// Налаштовуємо і створюємо сховище Redux
// Configure and create the Redux store
export const store = configureStore({
    reducer: {
        projects: projectReducer, // Додаємо редюсер для проєктів / Add the project reducer
        tasks: taskReducer,       // Додаємо редюсер для задач / Add the task reducer
        user: userReducer,        // Додаємо редюсер для користувачів / Add the user reducer
        activities: activityReducer, // Додаємо редюсер для активності / Add the activity reducer
        notifications: notificationReducer, // Додаємо редюсер для сповіщень / Add the notification reducer
    },
});

export default store; // Експортуємо налаштоване сховище / Export the configured store
