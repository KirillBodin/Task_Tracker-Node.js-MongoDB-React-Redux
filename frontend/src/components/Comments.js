import React, { useState, useEffect } from 'react'; // Import React hooks / Імпорт React хуків
import axios from 'axios'; // Import Axios for HTTP requests / Імпорт Axios для HTTP-запитів
import { useSelector } from 'react-redux'; // Import useSelector from Redux / Імпорт useSelector з Redux
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI

// Компонент для відображення та додавання коментарів / Comments component
const Comments = ({ taskId }) => {
    const [comments, setComments] = useState([]); // State for comments / Стан для коментарів
    const [newComment, setNewComment] = useState(''); // State for new comment / Стан для нового коментаря

    const user = useSelector((state) => state.auth.user); // Get current user from Redux store / Отримати поточного користувача з Redux store

    useEffect(() => {
        fetchComments(); // Fetch comments on mount / Отримати коментарі при монтуванні
    }, []); // Run effect only once / Запускати ефект лише один раз

    const fetchComments = async () => {
        const { data } = await axios.get(`/api/comments/${taskId}`); // Fetch comments from server / Отримати коментарі з сервера
        setComments(data); // Update state with fetched comments / Оновити стан отриманими коментарями
    };

    const handleAddComment = async () => {
        if (newComment.trim()) { // Check if new comment is not empty / Перевірити, що новий коментар не пустий
            const { data } = await axios.post(`/api/comments/${taskId}`, { text: newComment }); // Add new comment to server / Додати новий коментар на сервер
            setComments([...comments, data]); // Update state with new comment / Оновити стан новим коментарем
            setNewComment(''); // Clear input field / Очистити поле введення
        }
    };

    const handleDeleteComment = async (commentId) => {
        await axios.delete(`/api/comments/${commentId}`); // Delete comment from server / Видалити коментар з сервера
        setComments(comments.filter((comment) => comment._id !== commentId)); // Update state without deleted comment / Оновити стан без видаленого коментаря
    };

    return (
        <Box> {/* Container for comments section / Контейнер для секції коментарів */}
            <Typography variant="h6">Comments</Typography> {/* Section title / Заголовок секції */}
            <List> {/* Start of comments list / Початок списку коментарів */}
                {comments.map((comment) => ( // Map through comments / Перебір коментарів
                    <ListItem key={comment._id}> {/* Render each comment / Відобразити кожен коментар */}
                        <ListItemText
                            primary={comment.text} // Display comment text / Відобразити текст коментаря
                            secondary={`By: ${comment.user.username}`} // Display username / Відобразити ім'я користувача
                        />
                        {user && user._id === comment.user._id && ( // Show delete button if user is author / Показати кнопку видалення, якщо користувач є автором
                            <Button onClick={() => handleDeleteComment(comment._id)}>Delete</Button> // Delete button / Кнопка видалення
                        )}
                    </ListItem>
                ))}
            </List>
            <TextField
                label="Add a comment" // Label for input field / Мітка для поля введення
                value={newComment} // Bind input to state / Прив'язка введення до стану
                onChange={(e) => setNewComment(e.target.value)} // Update state on change / Оновити стан при зміні
                fullWidth // Full width input / Поле введення на всю ширину
            />
            <Button onClick={handleAddComment} variant="contained" color="primary">Add Comment</Button> {/* Button to add comment / Кнопка для додавання коментаря */}
        </Box>
    );
};

export default Comments; // Export Comments component / Експорт компонента Comments
