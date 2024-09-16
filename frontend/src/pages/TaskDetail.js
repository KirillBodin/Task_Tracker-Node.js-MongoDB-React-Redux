import React, { useEffect, useState } from 'react'; // Importing React, useEffect, and useState hooks / Імпортуємо React, хуки useEffect та useState
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux / Імпортуємо хук useDispatch з react-redux
import { useParams, useNavigate } from 'react-router-dom'; // Importing hooks for route parameters and navigation / Імпортуємо хуки для роботи з параметрами маршруту та навігації
import axios from 'axios'; // Importing axios for making HTTP requests / Імпортуємо axios для виконання HTTP-запитів
import { Box, Typography, Paper, CircularProgress, Button, TextField } from '@mui/material'; // Importing components from Material-UI / Імпортуємо компоненти з Material-UI
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Importing DatePicker component / Імпортуємо компонент DatePicker
import { LocalizationProvider } from '@mui/x-date-pickers'; // Importing LocalizationProvider for date pickers / Імпортуємо LocalizationProvider для date pickers
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'; // Importing AdapterMoment for moment.js support / Імпортуємо AdapterMoment для підтримки moment.js
import moment from 'moment'; // Importing moment for date manipulation / Імпортуємо moment для маніпуляції датами
import { deleteTask, updateTask, addComment } from '../redux/taskSlice'; // Importing actions from taskSlice / Імпортуємо дії з taskSlice

const TaskDetail = () => {
    const { id } = useParams(); // Extracting the task ID from the URL / Отримуємо ID завдання з URL
    const [task, setTask] = useState(null); // State for the task data / Стан для даних завдання
    const [loading, setLoading] = useState(true); // State for loading status / Стан для статусу завантаження
    const [error, setError] = useState(null); // State for error message / Стан для повідомлення про помилку
    const [comment, setComment] = useState(''); // State for the new comment / Стан для нового коментаря
    const [isEditing, setIsEditing] = useState(false); // State for edit mode / Стан для режиму редагування
    const [editedTask, setEditedTask] = useState({}); // State for the edited task data / Стан для відредагованих даних завдання
    const dispatch = useDispatch(); // Initializing dispatch function / Ініціалізуємо функцію dispatch
    const navigate = useNavigate(); // Initializing navigation function / Ініціалізуємо функцію навігації

    useEffect(() => {
        // Fetching the task data when the component mounts / Завантажуємо дані завдання при монтованні компоненту
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/api/tasks/${id}`); // Sending GET request to the server to get the task / Відправляємо GET-запит на сервер для отримання завдання
                setTask(response.data); // Updating the state with the received task data / Оновлюємо стан отриманими даними завдання
                setEditedTask({
                    ...response.data,
                    startDate: moment(response.data.startDate), // Ensuring dates are moment objects / Переконуємося, що дати є об'єктами moment
                    endDate: moment(response.data.endDate),
                });
                setLoading(false); // Setting loading to false after data is fetched / Встановлюємо стан завантаження на false після отримання даних
            } catch (err) {
                setError(err.message); // Setting error message if fetching fails / Встановлюємо повідомлення про помилку, якщо завантаження не вдалося
                setLoading(false); // Stopping the loading indicator / Зупиняємо індикатор завантаження
            }
        };

        fetchTask(); // Call the fetchTask function / Викликаємо функцію fetchTask
    }, [id]); // Effect depends on the task ID / Ефект залежить від ID завдання

    // Handler for deleting the task / Обробник для видалення завдання
    const handleDelete = async () => {
        try {
            await dispatch(deleteTask(id)).unwrap(); // Dispatch the deleteTask action / Відправляємо дію deleteTask
            navigate('/tasks'); // Redirect to the task list after deletion / Перенаправляємо до списку завдань після видалення
        } catch (err) {
            console.error('Failed to delete the task: ', err); // Log error if deletion fails / Виводимо помилку, якщо видалення не вдалося
        }
    };

    // Handler for updating the task / Обробник для оновлення завдання
    const handleUpdate = async () => {
        try {
            const updatedTask = {
                ...editedTask,
                startDate: editedTask.startDate.toISOString(), // Convert moment object to ISO string / Перетворюємо об'єкт moment на ISO-рядок
                endDate: editedTask.endDate.toISOString(),
            };
            await dispatch(updateTask({ id, updatedTask })).unwrap(); // Dispatch the updateTask action / Відправляємо дію updateTask
            setTask(editedTask); // Update the state with the edited task data / Оновлюємо стан відредагованими даними завдання
            setIsEditing(false); // Exit editing mode / Виходимо з режиму редагування
        } catch (err) {
            console.error('Failed to update the task: ', err); // Log error if update fails / Виводимо помилку, якщо оновлення не вдалося
        }
    };

    // Handler for adding a comment to the task / Обробник для додавання коментаря до завдання
    const handleAddComment = async () => {
        try {
            await dispatch(addComment({ taskId: id, text: comment })).unwrap(); // Dispatch the addComment action / Відправляємо дію addComment
            setComment(''); // Clear the comment input / Очищаємо поле коментаря
        } catch (err) {
            console.error('Failed to add comment: ', err); // Log error if adding comment fails / Виводимо помилку, якщо додавання коментаря не вдалося
        }
    };

    if (loading) { // If loading is true, show a loading indicator / Якщо стан завантаження true, показуємо індикатор завантаження
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) { // If there's an error, show the error message / Якщо є помилка, показуємо повідомлення про помилку
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}> {/* Providing localization for date picker / Забезпечуємо локалізацію для date picker */}
            <Box sx={{ padding: 3, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff' }}>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        {isEditing ? ( // If editing, show input fields / Якщо в режимі редагування, показуємо поля вводу
                            <TextField
                                label="Title"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                fullWidth
                            />
                        ) : (
                            task.title
                        )}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Description: {isEditing ? ( // If editing, show input fields / Якщо в режимі редагування, показуємо поля вводу
                        <TextField
                            label="Description"
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            fullWidth
                            multiline
                        />
                    ) : (
                        task.description
                    )}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Status: {isEditing ? ( // If editing, show input fields / Якщо в режимі редагування, показуємо поля вводу
                        <TextField
                            label="Status"
                            value={editedTask.status}
                            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                            fullWidth
                        />
                    ) : (
                        task.status
                    )}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Start Date: {isEditing ? ( // If editing, show input fields / Якщо в режимі редагування, показуємо поля вводу
                        <DatePicker
                            label="Start Date"
                            value={editedTask.startDate}
                            onChange={(newValue) => setEditedTask({ ...editedTask, startDate: newValue })}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    ) : (
                        new Date(task.startDate).toLocaleDateString()
                    )}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        End Date: {isEditing ? ( // If editing, show input fields / Якщо в режимі редагування, показуємо поля вводу
                        <DatePicker
                            label="End Date"
                            value={editedTask.endDate}
                            onChange={(newValue) => setEditedTask({ ...editedTask, endDate: newValue })}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    ) : (
                        new Date(task.endDate).toLocaleDateString()
                    )}
                    </Typography>

                    {/* Buttons for deleting and updating / Кнопки для видалення та оновлення */}
                    <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
                        {isEditing ? (
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                Save
                            </Button>
                        ) : (
                            <Button variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
                                Edit Task
                            </Button>
                        )}
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete Task
                        </Button>
                    </Box>

                    {/* Comments Section / Секція коментарів */}
                    <Box sx={{ marginTop: 4 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            Comments
                        </Typography>
                        {/* Add comment form / Форма додавання коментаря */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Add a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                multiline
                            />
                            <Button variant="contained" color="primary" onClick={handleAddComment}>
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default TaskDetail; // Export the TaskDetail component / Експортуємо компонент TaskDetail
