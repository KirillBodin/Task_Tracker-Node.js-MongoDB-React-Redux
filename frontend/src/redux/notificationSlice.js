import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importing functions from Redux Toolkit / Імпортуємо функції з Redux Toolkit
import axios from 'axios'; // Importing axios for making HTTP requests / Імпортуємо axios для виконання HTTP-запитів

// Асинхронний thunk для отримання сповіщень / Async thunk for fetching notifications
export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async () => {
    const response = await axios.get('/api/notifications'); // Виконуємо GET-запит для отримання сповіщень / Make a GET request to fetch notifications
    return response.data; // Повертаємо дані відповіді / Return the response data
});

// Асинхронний thunk для позначення сповіщення як прочитаного / Async thunk for marking a notification as read
export const markNotificationAsRead = createAsyncThunk('notifications/markAsRead', async (id) => {
    await axios.put(`/api/notifications/${id}/read`); // Виконуємо PUT-запит для позначення сповіщення як прочитаного / Make a PUT request to mark a notification as read
    return id; // Повертаємо ідентифікатор сповіщення / Return the notification ID
});

const notificationSlice = createSlice({
    name: 'notifications', // Назва зрізу / Name of the slice
    initialState: { // Початковий стан зрізу / Initial state for the slice
        items: [], // Масив для збереження сповіщень / Array to store notifications
        status: 'idle', // Стан операції отримання ('idle', 'loading', 'succeeded', 'failed') / Status of the fetch operation
        error: null, // Повідомлення про помилку, якщо отримання невдале / Error message if the fetch fails
    },
    reducers: {}, // Тут не визначено синхронних ред'юсерів / No synchronous reducers defined here
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => { // Обробляємо стан "в очікуванні" операції отримання / Handle the pending state of the fetch
                state.status = 'loading'; // Встановлюємо статус "завантаження" / Set status to loading
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => { // Обробляємо успішне завершення операції отримання / Handle the fulfilled state of the fetch
                state.status = 'succeeded'; // Встановлюємо статус "вдалося" / Set status to succeeded
                state.items = action.payload; // Встановлюємо сповіщення отриманими даними / Set notifications with fetched data
            })
            .addCase(fetchNotifications.rejected, (state, action) => { // Обробляємо невдачу операції отримання / Handle the rejected state of the fetch
                state.status = 'failed'; // Встановлюємо статус "невдалося" / Set status to failed
                state.error = action.error.message; // Зберігаємо повідомлення про помилку / Store error message
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => { // Обробляємо успішну позначку сповіщення як прочитаного / Handle the successful marking of a notification as read
                const index = state.items.findIndex(notification => notification._id === action.payload); // Знаходимо індекс сповіщення / Find the index of the notification
                if (index !== -1) { // Якщо сповіщення знайдено / If the notification is found
                    state.items[index].read = true; // Позначаємо сповіщення як прочитане / Mark the notification as read
                }
            });
    },
});

export default notificationSlice.reducer; // Експортуємо ред'юсер для зрізу сповіщень / Export the reducer for the notifications slice
