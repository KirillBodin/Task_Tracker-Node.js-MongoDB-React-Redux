import React, { useEffect, useState } from 'react'; // Import React and hooks for managing state and effects / Імпорт React та хуків для управління станом та ефектами
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for dispatching actions and selecting state from the Redux store / Імпорт хуків для відправки дій та вибору стану з Redux store
import { fetchActivities } from '../redux/activitySlice'; // Import action for fetching activities / Імпорт дії для отримання активностей
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper, TextField, MenuItem } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { Pagination } from '@mui/material'; // Import Pagination component for pagination / Імпорт компонента Pagination для пагінації
import { formatDistanceToNow, parseISO } from 'date-fns'; // Import date-fns for date formatting / Імпорт date-fns для форматування дати

const ActivityBoardPage = () => {
    const dispatch = useDispatch(); // Initialize dispatch to send actions to the store / Ініціалізація dispatch для відправлення дій до store
    const { activities, status, error } = useSelector((state) => state.activities); // Get activities, status, and error from Redux store / Отримати активності, статус та помилку з Redux store

    const [searchTerm, setSearchTerm] = useState(''); // State for the search term / Стан для пошукового запиту
    const [dateFilter, setDateFilter] = useState(''); // State for the date filter / Стан для фільтру дати
    const [currentPage, setCurrentPage] = useState(1); // State for the current page number / Стан для поточного номера сторінки
    const [itemsPerPage] = useState(5); // Number of items per page / Кількість елементів на сторінці

    useEffect(() => {
        if (status === 'idle') { // Fetch activities if status is idle / Отримати активності, якщо статус "idle"
            dispatch(fetchActivities());
        }
    }, [dispatch, status]); // Effect depends on dispatch and status / Ефект залежить від dispatch та status

    // Function to filter activities based on search term / Функція для фільтрації по імені користувача або ключовим словам
    const filterActivities = (activity) => {
        const userMatch = activity.user.username.toLowerCase().includes(searchTerm.toLowerCase()); // Check if username matches search term / Перевірка, чи збігається ім'я користувача з пошуковим запитом
        const actionMatch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()); // Check if action matches search term / Перевірка, чи збігається дія з пошуковим запитом
        const detailsMatch = activity.details.toLowerCase().includes(searchTerm.toLowerCase()); // Check if details match search term / Перевірка, чи збігаються деталі з пошуковим запитом

        return userMatch || actionMatch || detailsMatch; // Return true if any match found / Повертає true, якщо знайдено збіг
    };

    // Function to filter activities by date / Функція для фільтрації по даті
    const filterByDate = (activity) => {
        if (!dateFilter) return true; // Return all activities if no date filter is applied / Якщо фільтр дати не застосовано, повертаємо всі записи
        const activityDate = new Date(activity.createdAt); // Get activity creation date / Отримуємо дату створення активності
        const selectedDate = new Date(dateFilter); // Get selected filter date / Отримуємо обрану дату фільтрації
        return activityDate >= selectedDate; // Return true if activity date is on or after the selected date / Повертаємо true, якщо дата активності більша або дорівнює обраній даті
    };

    // Apply search and date filtering / Застосування пошуку та фільтрації по даті
    const filteredActivities = activities
        .filter(filterActivities)
        .filter(filterByDate);

    // Pagination logic / Логіка пагінації
    const indexOfLastItem = currentPage * itemsPerPage; // Calculate index of the last item on the current page / Розрахувати індекс останнього елементу на поточній сторінці
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Calculate index of the first item on the current page / Розрахувати індекс першого елементу на поточній сторінці
    const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered activities for the current page / Вирізати відфільтровані активності для поточної сторінки

    // Handle search input change / Обробник зміни пошукового запиту
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Update search term state / Оновити стан пошукового запиту
    };

    // Handle date filter change / Обробник зміни фільтру дати
    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value); // Update date filter state / Оновити стан фільтру дати
    };

    // Handle page change for pagination / Обробник зміни сторінки для пагінації
    const handlePageChange = (event, value) => {
        setCurrentPage(value); // Update current page state / Оновити стан поточної сторінки
    };

    // Conditional rendering for loading, error, and empty states / Умовне рендеринг для станів завантаження, помилки та порожнього результату
    if (status === 'loading') {
        return <Typography>Loading...</Typography>; // Show loading state / Показати стан завантаження
    }

    if (status === 'failed') {
        return <Typography color="error">Error: {error}</Typography>; // Show error message / Показати повідомлення про помилку
    }

    if (!activities || activities.length === 0) {
        return <Typography>No activities found.</Typography>; // Show message if no activities are found / Показати повідомлення, якщо активності не знайдено
    }

    return (
        <Box
            sx={{
                padding: 4,
                maxWidth: '900px',
                margin: 'auto',
                backgroundColor: 'background.default', // Set background color / Встановити колір фону
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow effect / Додаємо ефект тіні
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center', // Center align text / Вирівняти текст по центру
                    color: 'primary.main',
                    fontWeight: 'bold',
                    marginBottom: 4,
                }}
            >
                Activity Board {/* Title of the page / Заголовок сторінки */}
            </Typography>

            {/* Search input / Поле пошуку */}
            <TextField
                label="Search by username, action, or task" // Label for search input / Мітка для поля пошуку
                value={searchTerm} // Bind search term state / Прив'язка стану пошукового запиту
                onChange={handleSearchChange} // Handle change in search input / Обробник зміни пошукового запиту
                fullWidth
                sx={{ marginBottom: 3 }}
            />

            {/* Date filter input / Фільтр по даті */}
            <TextField
                label="Filter by date" // Label for date filter / Мітка для фільтру по даті
                type="date"
                value={dateFilter} // Bind date filter state / Прив'язка стану фільтру дати
                onChange={handleDateFilterChange} // Handle change in date filter / Обробник зміни фільтру дати
                fullWidth
                sx={{ marginBottom: 3 }}
                InputLabelProps={{
                    shrink: true, // Shrink label when date is selected / Стискає мітку, коли дата обрана
                }}
            />

            <List>
                {currentActivities.map((activity) => ( // Map over current activities for the current page / Перебір поточних активностей для поточної сторінки
                    <React.Fragment key={activity._id}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 2,
                                marginBottom: 3,
                                borderRadius: '8px', // Rounded corners / Закруглені кути
                                backgroundColor: '#fff',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.02)', // Slightly scale up on hover / Легке збільшення при наведенні
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', // Add hover shadow effect / Додати ефект тіні при наведенні
                                },
                            }}
                        >
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold', color: 'text.primary' }}
                                        >
                                            {`${activity.user.username || 'Unknown User'} (ID: ${activity.user._id}) ${activity.action}`}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {`${activity.details} - ${formatDistanceToNow(new Date(activity.createdAt))} ago`} {/* Format time ago / Форматування часу минулого */}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Paper>
                    </React.Fragment>
                ))}
            </List>

            {/* Pagination controls / Елементи керування пагінацією */}
            <Pagination
                count={Math.ceil(filteredActivities.length / itemsPerPage)} // Calculate total number of pages / Розрахувати загальну кількість сторінок
                page={currentPage} // Current page number / Поточний номер сторінки
                onChange={handlePageChange} // Handle page change / Обробник зміни сторінки
                color="primary"
                sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}
            />
        </Box>
    );
};

export default ActivityBoardPage; // Export the ActivityBoardPage component / Експорт компонента ActivityBoardPage
