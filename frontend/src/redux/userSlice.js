import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Импортируем функции из Redux Toolkit / Import functions from Redux Toolkit
import axios from 'axios'; // Импортиуем axios для работы с HTTP запросами / Import axios to handle HTTP requests

// Асинхронный thunk для получения пользователей с маршрута `/api/user`
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await axios.get('/api/user');
    return response.data;
});
// Получение данных пользователя / Fetch user profile
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async () => {
    const response = await axios.get('/api/user/profile');
    return response.data;
});

// Обновление данных пользователя / Update user profile
export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (formData) => {
    const response = await axios.put('/api/user/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});
// Создаем слайс для работы с пользователями / Create a slice for users
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        profile: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload; // Заполняем users полученными данными
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer; // Экспортируем редюсер слайса / Export the slice reducer
