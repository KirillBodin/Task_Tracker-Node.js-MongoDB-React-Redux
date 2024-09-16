// src/redux/activitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importing functions from Redux Toolkit / Імпортуємо функції з Redux Toolkit
import axios from 'axios'; // Importing axios for making HTTP requests / Імпортуємо axios для виконання HTTP-запитів

// Асинхронний thunk для отримання активностей / Async thunk for fetching activities
export const fetchActivities = createAsyncThunk('activities/fetchActivities', async () => {
    // Виконуємо GET-запит для отримання активностей / Make a GET request to fetch activities
    const response = await axios.get('/api/activities');
    return response.data; // Повертаємо дані відповіді / Return the response data
});

const activitySlice = createSlice({
    name: 'activities', // Назва зрізу / Name of the slice
    initialState: { // Початковий стан зрізу / Initial state for the slice
        activities: [], // Масив для збереження активностей / Array to store activities
        status: 'idle', // Стан операції отримання ('idle', 'loading', 'succeeded', 'failed') / Status of the fetch operation
        error: null, // Повідомлення про помилку, якщо отримання невдале / Error message if the fetch fails
    },
    reducers: {}, // Немає ред'юсерів, оскільки використовуємо extraReducers для асинхронних дій / No reducers as we are using extraReducers for async actions
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.pending, (state) => { // Обробляємо стан "в очікуванні" операції отримання / Handle the pending state of the fetch
                state.status = 'loading'; // Встановлюємо статус "завантаження" / Set status to loading
            })
            .addCase(fetchActivities.fulfilled, (state, action) => { // Обробляємо успішне завершення операції отримання / Handle the fulfilled state of the fetch
                state.status = 'succeeded'; // Встановлюємо статус "вдалося" / Set status to succeeded
                state.activities = action.payload; // Встановлюємо активності отриманими даними / Set activities with fetched data
            })
            .addCase(fetchActivities.rejected, (state, action) => { // Обробляємо невдачу операції отримання / Handle the rejected state of the fetch
                state.status = 'failed'; // Встановлюємо статус "невдалося" / Set status to failed
                state.error = action.error.message; // Зберігаємо повідомлення про помилку / Store error message
            });
    },
});

export default activitySlice.reducer; // Експортуємо ред'юсер для зрізу активностей / Export the reducer for the activities slice
