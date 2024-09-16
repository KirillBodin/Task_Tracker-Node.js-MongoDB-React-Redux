import React, { useState } from 'react'; // Import React and useState for managing state / Імпорт React та useState для управління станом
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions to the store / Імпорт useDispatch для відправлення дій до store
import { updateTask, addComment } from '../redux/taskSlice'; // Import actions for updating a task and adding comments / Імпорт дій для оновлення завдання та додавання коментарів
import { Box, Typography, List, ListItem, TextField, Button } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { useTheme } from '@mui/material/styles'; // Import useTheme to access the theme / Імпорт useTheme для доступу до теми
import TaskTimer from "./TaskTimer"; // Import TaskTimer component for tracking time / Імпорт компонента TaskTimer для відстеження часу

const TaskDetails = ({ task }) => { // TaskDetails component to display and manage a specific task / Компонент TaskDetails для відображення та керування конкретним завданням
    const [newComment, setNewComment] = useState(''); // State to store the new comment text / Стан для зберігання тексту нового коментаря
    const dispatch = useDispatch(); // Hook to dispatch actions to the store / Хук для відправлення дій до store
    const theme = useTheme(); // Get the current theme for styling / Отримати поточну тему для стилізації

    // Handle submission of a new comment / Обробник відправлення нового коментаря
    const handleCommentSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior / Запобігання стандартній поведінці відправлення форми
        dispatch(addComment({ taskId: task._id, text: newComment })); // Dispatch action to add a comment / Відправити дію для додавання коментаря
        setNewComment(''); // Clear the input field after submission / Очищення поля введення після відправлення
    };

    // Handle task updates, e.g., changing status / Обробник оновлень завдання, наприклад, зміни статусу
    const handleTaskUpdate = (updatedFields) => {
        dispatch(updateTask({ ...task, ...updatedFields })); // Dispatch action to update the task with new fields / Відправити дію для оновлення завдання з новими полями
    };

    return (
        <Box sx={{ padding: 2, bgcolor: theme.palette.background.paper }}> {/* Container for task details / Контейнер для деталей завдання */}
            <Typography variant="h5" color="textPrimary">{task.title}</Typography> {/* Display task title / Відображення назви завдання */}
            <Typography variant="body1" color="textSecondary">{task.description}</Typography> {/* Display task description / Відображення опису завдання */}

            <Typography variant="h6" color="textPrimary" sx={{ marginTop: 2 }}>Comments</Typography> {/* Section title for comments / Заголовок секції коментарів */}
            <List> {/* List container for comments / Контейнер списку для коментарів */}
                {task.comments.map((comment, index) => ( // Iterate over task comments / Перебір коментарів завдання
                    <ListItem key={index}>
                        <Typography variant="body2" color="textSecondary">{comment.text}</Typography> {/* Display each comment / Відображення кожного коментаря */}
                    </ListItem>
                ))}
            </List>

            <TaskTimer taskId={task._id} initialTimeSpent={task.timeSpent} /> {/* Include TaskTimer component to track time / Включити компонент TaskTimer для відстеження часу */}

            <Box component="form" onSubmit={handleCommentSubmit} sx={{ marginTop: 2 }}> {/* Form to add a new comment / Форма для додавання нового коментаря */}
                <TextField
                    fullWidth
                    label="Add a comment"
                    variant="outlined"
                    value={newComment} // Bind input value to state / Прив'язка значення введення до стану
                    onChange={(e) => setNewComment(e.target.value)} // Update state on input change / Оновлення стану при зміні введення
                    sx={{ marginBottom: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">Add Comment</Button> {/* Button to submit the new comment / Кнопка для відправлення нового коментаря */}
            </Box>

            <Box sx={{ marginTop: 2 }}> {/* Container for task update buttons / Контейнер для кнопок оновлення завдання */}
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleTaskUpdate({ status: 'In Progress' })} // Update task status to "In Progress" / Оновити статус завдання на "In Progress"
                    sx={{ marginRight: 1 }}
                >
                    Move to In Progress {/* Button text / Текст кнопки */}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleTaskUpdate({ status: 'Done' })} // Update task status to "Done" / Оновити статус завдання на "Done"
                >
                    Move to Done {/* Button text / Текст кнопки */}
                </Button>
            </Box>
        </Box>
    );
};

export default TaskDetails; // Export the TaskDetails component / Експорт компонента TaskDetails
