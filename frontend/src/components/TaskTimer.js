import React, { useState, useEffect } from 'react'; // Import React and hooks for state and effect management / Імпорт React та хуків для управління станом та ефектами
import { Button, Box, Typography } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import axios from 'axios'; // Import Axios for making HTTP requests / Імпорт Axios для виконання HTTP-запитів

const TaskTimer = ({ taskId, initialTimeSpent }) => { // TaskTimer component for tracking time spent on a task / Компонент TaskTimer для відстеження часу, витраченого на завдання
    const [time, setTime] = useState(initialTimeSpent || 0); // State for storing time spent / Стан для зберігання витраченого часу
    const [isRunning, setIsRunning] = useState(false); // State to check if the timer is running / Стан для перевірки, чи працює таймер

    useEffect(() => {
        let interval; // Declare interval variable for setInterval / Оголошуємо змінну interval для setInterval
        if (isRunning) { // If the timer is running, start interval / Якщо таймер працює, запускаємо інтервал
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1); // Increment time every second / Збільшуємо час кожну секунду
            }, 1000); // Set interval to 1 second / Встановлюємо інтервал на 1 секунду
        }

        return () => clearInterval(interval); // Clear interval when the component unmounts or isRunning changes / Очищаємо інтервал, коли компонент демонтується або змінюється isRunning
    }, [isRunning]); // Effect depends on isRunning / Ефект залежить від isRunning

    // Start the timer / Запуск таймера
    const handleStart = async () => {
        try {
            await axios.put(`/api/tasks/${taskId}/start-timer`); // Make API request to start timer / Виконуємо запит до API для запуску таймера
            setIsRunning(true); // Set isRunning to true / Встановлюємо isRunning в true
        } catch (error) {
            console.error('Error starting timer:', error); // Log error if request fails / Вивести помилку, якщо запит не вдався
        }
    };

    // Stop the timer / Зупинка таймера
    const handleStop = async () => {
        try {
            await axios.put(`/api/tasks/${taskId}/stop-timer`); // Make API request to stop timer / Виконуємо запит до API для зупинки таймера
            setIsRunning(false); // Set isRunning to false / Встановлюємо isRunning в false
        } catch (error) {
            console.error('Error stopping timer:', error); // Log error if request fails / Вивести помилку, якщо запит не вдався
        }
    };

    // Reset the timer / Скидання таймера
    const handleReset = async () => {
        try {
            await axios.put(`/api/tasks/${taskId}/reset-timer`); // Make API request to reset timer / Виконуємо запит до API для скидання таймера
            setTime(0); // Reset time to 0 / Скидаємо час до 0
            setIsRunning(false); // Set isRunning to false / Встановлюємо isRunning в false
        } catch (error) {
            console.error('Error resetting timer:', error); // Log error if request fails / Вивести помилку, якщо запит не вдався
        }
    };

    // Format time into HH:MM:SS / Форматування часу у вигляді ГГ:ХХ:СС
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600); // Calculate hours / Обчислити години
        const minutes = Math.floor((time % 3600) / 60); // Calculate minutes / Обчислити хвилини
        const seconds = time % 60; // Calculate seconds / Обчислити секунди
        // Return formatted time as a string / Повернути форматований час як рядок
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Box>
            <Typography variant="h6">Time Spent: {formatTime(time)}</Typography> {/* Display formatted time / Відображення форматованого часу */}
            <Button onClick={isRunning ? handleStop : handleStart} variant="contained" color="primary">
                {isRunning ? 'Stop' : 'Start'} {/* Toggle button text between Start and Stop / Перемикання тексту кнопки між "Start" і "Stop" */}
            </Button>
            <Button onClick={handleReset} variant="contained" color="secondary" sx={{ ml: 2 }}>
                Reset {/* Button to reset timer / Кнопка для скидання таймера */}
            </Button>
        </Box>
    );
};

export default TaskTimer; // Export the TaskTimer component / Експорт компонента TaskTimer
