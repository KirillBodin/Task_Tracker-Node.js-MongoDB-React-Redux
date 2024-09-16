import React, { useState } from 'react'; // Import React and useState for managing state / Імпорт React та useState для управління станом
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions to the store / Імпорт useDispatch для відправлення дій до store
import { updateTask, addComment } from '../redux/taskSlice'; // Import actions for updating tasks and adding comments / Імпорт дій для оновлення завдань та додавання коментарів
import { Box, Typography, Button, TextField } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI

const TaskItem = ({ task }) => { // TaskItem component to display and manage individual tasks / Компонент TaskItem для відображення та керування окремими завданнями
    const dispatch = useDispatch(); // Hook to dispatch actions to the store / Хук для відправлення дій до store
    const [newComment, setNewComment] = useState(''); // State for the new comment text / Стан для тексту нового коментаря
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode / Стан для перемикання режиму редагування
    const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description }); // State for edited task details / Стан для деталей редагованого завдання

    // Save the edited task / Зберегти редаговане завдання
    const handleSaveTask = () => {
        dispatch(updateTask({ ...task, ...editedTask })); // Dispatch updateTask action with edited task details / Відправити дію updateTask з деталями редагованого завдання
        setIsEditing(false); // Exit edit mode after saving / Вийти з режиму редагування після збереження
    };

    // Add a new comment to the task / Додати новий коментар до завдання
    const handleAddComment = () => {
        dispatch(addComment({ taskId: task._id, text: newComment })); // Dispatch addComment action with new comment / Відправити дію addComment з новим коментарем
        setNewComment(''); // Clear the comment input field / Очистити поле введення коментаря
    };

    return (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}> {/* Container for task item / Контейнер для елемента завдання */}
            {isEditing ? ( // Render editing fields if in edit mode / Відображення полів редагування, якщо увімкнено режим редагування
                <Box>
                    <TextField
                        label="Title" // Label for the title input / Мітка для введення назви
                        value={editedTask.title} // Bind title input to state / Прив'язка введення назви до стану
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} // Update title state on change / Оновлення стану назви при зміні
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Description" // Label for the description input / Мітка для введення опису
                        value={editedTask.description} // Bind description input to state / Прив'язка введення опису до стану
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} // Update description state on change / Оновлення стану опису при зміні
                        fullWidth
                        multiline
                        rows={4} // Set number of rows for the textarea / Встановлення кількості рядків для текстової області
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSaveTask} sx={{ mr: 1 }}>
                        Save {/* Button to save changes / Кнопка для збереження змін */}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                        Cancel {/* Button to cancel editing / Кнопка для скасування редагування */}
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6" color="textPrimary">{task.title}</Typography> {/* Display task title / Відображення назви завдання */}
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                        {task.description} {/* Display task description / Відображення опису завдання */}
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)}>
                        Edit {/* Button to enter edit mode / Кнопка для переходу в режим редагування */}
                    </Button>
                </Box>
            )}

            <Box mt={2}> {/* Container for adding a comment / Контейнер для додавання коментаря */}
                <TextField
                    label="Add Comment" // Label for the comment input / Мітка для введення коментаря
                    value={newComment} // Bind comment input to state / Прив'язка введення коментаря до стану
                    onChange={(e) => setNewComment(e.target.value)} // Update comment state on change / Оновлення стану коментаря при зміні
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddComment}>
                    Add Comment {/* Button to add the comment / Кнопка для додавання коментаря */}
                </Button>
            </Box>
            <Box mt={2}> {/* Container for displaying comments / Контейнер для відображення коментарів */}
                {task.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {comment.text} {/* Display each comment / Відображення кожного коментаря */}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default TaskItem; // Export the TaskItem component / Експорт компонента TaskItem
