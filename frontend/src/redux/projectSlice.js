// Import functions from Redux Toolkit / Імпортуємо функції з Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Встановлюємо базовий URL для axios / Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:5000';

// Отримуємо токен з локального сховища / Get token from local storage
const token = localStorage.getItem('token');

// Встановлюємо токен у заголовки за замовчуванням / Set token in default headers
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Визначаємо асинхронний thunk для отримання всіх проєктів
// Define async thunk for fetching all projects
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await axios.get('/api/projects'); // Виконуємо GET-запит для отримання всіх проєктів / Make a GET request to fetch all projects
    return response.data; // Повертаємо дані відповіді / Return the response data
});

// Визначаємо асинхронний thunk для отримання проєкту за ID
// Define async thunk for fetching a project by ID
export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (id) => {
    const response = await axios.get(`/api/projects/${id}`); // Виконуємо GET-запит для отримання проєкту за ID / Make a GET request to fetch a project by ID
    return response.data; // Повертаємо дані відповіді / Return the response data
});

// Визначаємо асинхронний thunk для додавання нового проєкту
// Define async thunk for adding a new project
export const addProject = createAsyncThunk('projects/addProject', async (project) => {
    const response = await axios.post('/api/projects', project); // Виконуємо POST-запит для додавання нового проєкту / Make a POST request to add a new project
    return response.data; // Повертаємо дані відповіді / Return the response data
});

// Визначаємо асинхронний thunk для оновлення проєкту
// Define async thunk for updating a project
export const updateProject = createAsyncThunk('projects/updateProject', async (project) => {
    const response = await axios.put(`/api/projects/${project._id}`, project); // Виконуємо PUT-запит для оновлення проєкту / Make a PUT request to update a project
    return response.data; // Повертаємо дані відповіді / Return the response data
});

// Визначаємо асинхронний thunk для видалення проєкту
// Define async thunk for deleting a project
export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
    await axios.delete(`/api/projects/${id}`); // Виконуємо DELETE-запит для видалення проєкту / Make a DELETE request to remove a project
    return id; // Повертаємо ID видаленого проєкту / Return the ID of the deleted project
});

// Створюємо зріз для проєктів
// Create a slice for projects
const projectSlice = createSlice({
    name: 'projects', // Назва зрізу / Name of the slice
    initialState: { // Початковий стан зрізу / Initial state of the slice
        projects: [], // Масив для зберігання даних проєктів / Array to store project data
        status: 'idle', // Статус операції отримання ('idle', 'loading', 'succeeded', 'failed') / Status of the fetch operation
        error: null, // Повідомлення про помилку, якщо отримання не вдалося / Error message if the fetch fails
    },
    reducers: {}, // Синхронні ред'юсери тут не визначені / No synchronous reducers defined here
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => { // Обробка стану "в очікуванні" при отриманні проєктів / Handle the pending state of fetching projects
                state.status = 'loading'; // Встановлюємо статус "завантаження" / Set status to 'loading'
            })
            .addCase(fetchProjects.fulfilled, (state, action) => { // Обробка успішного завершення отримання проєктів / Handle the fulfilled state of fetching projects
                state.status = 'succeeded'; // Встановлюємо статус "успіх" / Set status to 'succeeded'
                state.projects = action.payload; // Зберігаємо отримані проєкти у стані / Store the fetched projects in state
            })
            .addCase(fetchProjects.rejected, (state, action) => { // Обробка невдачі при отриманні проєктів / Handle the rejected state of fetching projects
                state.status = 'failed'; // Встановлюємо статус "помилка" / Set status to 'failed'
                state.error = action.error.message; // Зберігаємо повідомлення про помилку у стані / Store the error message in state
            })
            .addCase(fetchProjectById.pending, (state) => { // Обробка стану "в очікуванні" при отриманні проєкту за ID / Handle the pending state of fetching a project by ID
                state.status = 'loading'; // Встановлюємо статус "завантаження" / Set status to 'loading'
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => { // Обробка успішного завершення отримання проєкту за ID / Handle the fulfilled state of fetching a project by ID
                state.status = 'succeeded'; // Встановлюємо статус "успіх" / Set status to 'succeeded'
                const index = state.projects.findIndex(project => project._id === action.payload._id); // Знаходимо індекс проєкту у стані / Find the index of the project in the state
                if (index === -1) {
                    state.projects.push(action.payload); // Додаємо проєкт, якщо він не знайдений / Add the project if not found
                } else {
                    state.projects[index] = action.payload; // Оновлюємо існуючий проєкт / Update the existing project
                }
            })
            .addCase(fetchProjectById.rejected, (state, action) => { // Обробка невдачі при отриманні проєкту за ID / Handle the rejected state of fetching a project by ID
                state.status = 'failed'; // Встановлюємо статус "помилка" / Set status to 'failed'
                state.error = action.error.message; // Зберігаємо повідомлення про помилку у стані / Store the error message in state
            })
            .addCase(addProject.fulfilled, (state, action) => { // Обробка успішного завершення додавання проєкту / Handle the fulfilled state of adding a project
                state.projects.push(action.payload); // Додаємо новий проєкт у стан / Add the new project to state
            })
            .addCase(updateProject.fulfilled, (state, action) => { // Обробка успішного завершення оновлення проєкту / Handle the fulfilled state of updating a project
                const index = state.projects.findIndex((project) => project._id === action.payload._id); // Знаходимо індекс проєкту для оновлення / Find the index of the project to update
                if (index !== -1) {
                    state.projects[index] = action.payload; // Оновлюємо проєкт у стані / Update the project in state
                }
            })
            .addCase(deleteProject.fulfilled, (state, action) => { // Обробка успішного завершення видалення проєкту / Handle the fulfilled state of deleting a project
                state.projects = state.projects.filter((project) => project._id !== action.payload); // Видаляємо видалений проєкт зі стану / Remove the deleted project from state
            });
    },
});

export default projectSlice.reducer; // Експортуємо ред'юсер для використання в Redux-сховищі / Export the reducer for use in the Redux store
