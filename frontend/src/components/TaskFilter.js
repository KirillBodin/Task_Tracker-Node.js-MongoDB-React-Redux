// src/components/TaskFilter.js

import React from 'react'; // Import React for creating the component / Імпорт React для створення компонента
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import DatePicker component for date selection / Імпорт компонента DatePicker для вибору дати

const TaskFilter = ({
                        users, // List of users for filtering / Список користувачів для фільтрації
                        selectedUser, // State to store selected user / Стан для зберігання обраного користувача
                        setSelectedUser, // Function to update selected user / Функція для оновлення обраного користувача
                        startDate, // State for selected start date / Стан для обраної дати початку
                        setStartDate, // Function to update start date / Функція для оновлення дати початку
                        endDate, // State for selected end date / Стан для обраної дати завершення
                        setEndDate, // Function to update end date / Функція для оновлення дати завершення
                        searchTerm, // State for search term / Стан для пошукового запиту
                        setSearchTerm // Function to update search term / Функція для оновлення пошукового запиту
                    }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}> {/* Flexbox container for the filter controls / Flexbox контейнер для елементів фільтру */}

            {/* Assigned To Filter / Фільтр по виконавцю */}
            <FormControl sx={{ minWidth: 150 }}> {/* Minimum width for the select input / Мінімальна ширина для поля select */}
                <InputLabel>Assigned To</InputLabel> {/* Label for the dropdown / Мітка для випадаючого списку */}
                <Select
                    value={selectedUser} // Bind selected user state / Прив'язка стану обраного користувача
                    onChange={(e) => setSelectedUser(e.target.value)} // Update selected user on change / Оновлення обраного користувача при зміні
                    label="Assigned To" // Label text / Текст мітки
                >
                    <MenuItem value="all">All Users</MenuItem> {/* Option for all users / Варіант для всіх користувачів */}
                    {users.map((user) => ( // Iterate over users to create options / Перебір користувачів для створення варіантів
                        <MenuItem key={user._id} value={user._id}>{user.username}</MenuItem> // Display each user as an option / Відображення кожного користувача як варіанту
                    ))}
                </Select>
            </FormControl>

            {/* Start Date Filter / Фільтр по даті початку */}
            <DatePicker
                label="Start Date" // Label for the date picker / Мітка для вибору дати
                value={startDate} // Bind start date state / Прив'язка стану дати початку
                onChange={(newValue) => setStartDate(newValue)} // Update start date on change / Оновлення дати початку при зміні
                renderInput={(params) => <TextField {...params} />} // Use TextField as input / Використання TextField як поля введення
            />

            {/* End Date Filter / Фільтр по даті завершення */}
            <DatePicker
                label="End Date" // Label for the date picker / Мітка для вибору дати
                value={endDate} // Bind end date state / Прив'язка стану дати завершення
                onChange={(newValue) => setEndDate(newValue)} // Update end date on change / Оновлення дати завершення при зміні
                renderInput={(params) => <TextField {...params} />} // Use TextField as input / Використання TextField як поля введення
            />

            {/* Search Field / Поле для пошуку */}
            <TextField
                label="Search" // Label for the search input / Мітка для поля пошуку
                value={searchTerm} // Bind search term state / Прив'язка стану пошукового запиту
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change / Оновлення пошукового запиту при зміні
                variant="outlined" // Use outlined variant for the input / Використання варіанту з обведенням для поля введення
            />
        </Box>
    );
};

export default TaskFilter; // Export TaskFilter component / Експорт компонента TaskFilter
