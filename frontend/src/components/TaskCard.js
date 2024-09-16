import React from 'react'; // Import React for creating the component / Імпорт React для створення компонента
import { Card, CardContent, Typography, Box, Button } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { useDispatch } from 'react-redux'; // Import useDispatch for dispatching actions to the store / Імпорт useDispatch для відправлення дій до store
import { deleteTask } from '../redux/taskSlice'; // Import deleteTask action from taskSlice / Імпорт дії deleteTask з taskSlice
import { useTheme } from '@mui/material/styles'; // Import useTheme to access the theme / Імпорт useTheme для доступу до теми

const TaskCard = ({ task }) => { // TaskCard component to display individual tasks / Компонент TaskCard для відображення окремих завдань
    const dispatch = useDispatch(); // Hook to dispatch actions to the store / Хук для відправлення дій до store
    const theme = useTheme(); // Get the current theme for styling / Отримати поточну тему для стилізації

    // Handler function to delete a task / Обробник для видалення завдання
    const handleDelete = () => {
        // Show a confirmation dialog before deleting the task / Показати діалог підтвердження перед видаленням завдання
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task._id)); // Dispatch deleteTask action with task ID / Відправити дію deleteTask з ID завдання
        }
    };

    return (
        <Card
            variant="outlined" // Outlined variant of the card / Вариант карты с обводкой
            sx={{ mb: 2, bgcolor: theme.palette.background.paper }} // Use theme background color / Використати колір фону з теми
        >
            <CardContent> {/* Container for card content / Контейнер для вмісту карти */}
                <Typography
                    variant="h6"
                    color="textPrimary" // Use primary color for title / Використати основний колір для заголовку
                >
                    {task.title} {/* Display task title / Відображення заголовку завдання */}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary" // Use secondary color for description / Використати вторинний колір для опису
                >
                    {task.description} {/* Display task description / Відображення опису завдання */}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between"> {/* Container for project info and delete button / Контейнер для інформації про проект та кнопки видалення */}
                    <Typography
                        variant="caption"
                        color="textSecondary" // Use secondary color for project info / Використати вторинний колір для інформації про проект
                    >
                        Project: {task.project?.title || 'No Project'} {/* Display project title or fallback if not available / Відображення назви проекту або запасного тексту, якщо не доступно */}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={handleDelete} // Handle click to delete the task / Обробка кліку для видалення завдання
                    >
                        Delete {/* Button text / Текст кнопки */}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard; // Export the TaskCard component / Експорт компонента TaskCard
