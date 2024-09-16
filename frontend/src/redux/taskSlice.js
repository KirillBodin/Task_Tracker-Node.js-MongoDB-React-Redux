import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for asynchronous operations with tasks / Thunks для асинхронних операцій із завданнями

// Fetch all tasks / Отримання всіх завдань
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('/api/tasks'); // Sending GET request to fetch all tasks / Відправка GET-запиту для отримання всіх завдань
    return response.data; // Return the fetched tasks / Повертаємо отримані завдання
});

// Fetch tasks by status / Отримання завдань за статусом
export const fetchTasksByStatus = createAsyncThunk('tasks/fetchTasksByStatus', async (status) => {
    const response = await axios.get(`/api/tasks/status/${status}`); // Sending GET request to fetch tasks by status / Відправка GET-запиту для отримання завдань за статусом
    return response.data; // Return the fetched tasks / Повертаємо отримані завдання
});

// Fetch tasks for a specific project / Асинхронний thunk для отримання завдань конкретного проекту
export const fetchTasksByProject = createAsyncThunk('tasks/fetchTasksByProject', async (projectId) => {
    const response = await axios.get(`/api/projects/${projectId}/tasks`); // Sending GET request to fetch tasks by project ID / Відправка GET-запиту для отримання завдань за ID проекту
    return response.data; // Return the fetched tasks / Повертаємо отримані завдання
});

// Add a new task / Додавання нового завдання
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await axios.post('/api/tasks', task); // Sending POST request to add a new task / Відправка POST-запиту для додавання нового завдання
    return response.data; // Return the added task / Повертаємо додане завдання
});

// Update a task / Оновлення завдання
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedTask }) => {
    const response = await axios.put(`/api/tasks/${id}`, updatedTask); // Sending PUT request to update a task / Відправка PUT-запиту для оновлення завдання
    return response.data; // Return the updated task / Повертаємо оновлене завдання
});

// Update task status / Оновлення статусу завдання
export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ taskId, status }) => {
    const response = await axios.put(`/api/tasks/${taskId}`, { status }); // Sending PUT request to update task status / Відправка PUT-запиту для оновлення статусу завдання
    return response.data; // Return the updated task / Повертаємо оновлене завдання
});

// Add a comment to a task / Додавання коментаря до завдання
export const addComment = createAsyncThunk('tasks/addComment', async ({ taskId, text }) => {
    const response = await axios.post(`/api/tasks/${taskId}/comments`, { text }); // Sending POST request to add a comment to a task / Відправка POST-запиту для додавання коментаря до завдання
    return response.data; // Return the task with the new comment / Повертаємо завдання з новим коментарем
});

// Delete a task / Видалення завдання
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await axios.delete(`/api/tasks/${id}`); // Sending DELETE request to remove a task / Відправка DELETE-запиту для видалення завдання
    return id; // Return the ID of the deleted task / Повертаємо ID видаленого завдання
});

// Add a task to a project / Додавання завдання до проекту
export const addTaskToProject = createAsyncThunk('tasks/addTaskToProject', async ({ projectId, taskId }) => {
    const response = await axios.post(`/api/projects/${projectId}/tasks`, { taskId }); // Sending POST request to add a task to a project / Відправка POST-запиту для додавання завдання до проекту
    return response.data; // Return the project with the new task / Повертаємо проект з новим завданням
});

// Create a slice for tasks / Створення слайсу для завдань
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // Reducer to manually set tasks / Редюсер для ручного встановлення завдань
        setTasks(state, action) {
            state.tasks = action.payload; // Set the tasks state / Встановлюємо стан завдань
        },
        // Reducer to manually update a task / Редюсер для ручного оновлення завдання
        manualUpdateTask(state, action) {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload; // Update the task in the state / Оновлюємо завдання в стані
            }
        },
        // Reducer to manually remove a task / Редюсер для ручного видалення завдання
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task._id !== action.payload); // Remove the task from the state / Видаляємо завдання зі стану
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                state.tasks = action.payload; // Set the tasks state / Встановлюємо стан завдань
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(fetchTasksByProject.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(fetchTasksByProject.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                state.tasks = action.payload; // Set the tasks state / Встановлюємо стан завдань
            })
            .addCase(fetchTasksByProject.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(fetchTasksByStatus.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                state.tasks = action.payload; // Set the tasks state / Встановлюємо стан завдань
            })
            .addCase(fetchTasksByStatus.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(addTask.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                state.tasks.push(action.payload); // Add the new task to the state / Додаємо нове завдання до стану
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload; // Update the task in the state / Оновлюємо завдання в стані
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(updateTaskStatus.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index].status = action.payload.status; // Update the task status in the state / Оновлюємо статус завдання в стані
                }
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(addComment.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload; // Update the task with the new comment in the state / Оновлюємо завдання з новим коментарем у стані
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                state.tasks = state.tasks.filter(task => task._id !== action.payload); // Remove the task from the state / Видаляємо завдання зі стану
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            })
            .addCase(addTaskToProject.pending, (state) => {
                state.status = 'loading'; // Set status to loading / Встановлюємо статус "loading"
            })
            .addCase(addTaskToProject.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded / Встановлюємо статус "succeeded"
                state.tasks.push(action.payload); // Add the task to the state / Додаємо завдання до стану
            })
            .addCase(addTaskToProject.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed / Встановлюємо статус "failed"
                state.error = action.error.message; // Set the error message / Встановлюємо повідомлення про помилку
            });
    },
});

// Export actions and reducer / Експортуємо дії та редюсер
export const { setTasks, manualUpdateTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
