import React, { useEffect, useState } from 'react'; // Import React and hooks for state and effect management / Імпорт React та хуків для управління станом та ефектами
import axios from 'axios'; // Import Axios for making HTTP requests / Імпорт Axios для виконання HTTP-запитів
import { Box, Typography, List, ListItem, Divider } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI

const ProjectStatusReport = () => {
    const [report, setReport] = useState([]); // State to store project status report / Стан для зберігання звіту про статус проєкту

    useEffect(() => {
        const fetchReport = async () => { // Function to fetch project status report from server / Функція для отримання звіту про статус проєкту з сервера
            try {
                const response = await axios.get('/api/reports/projects'); // Fetch report data from API endpoint / Отримати дані звіту з API
                setReport(response.data); // Update state with fetched data / Оновити стан отриманими даними
            } catch (error) {
                console.error("Error fetching project report:", error); // Log errors if fetching fails / Вивести помилки, якщо запит не вдався
            }
        };

        fetchReport(); // Call the function to fetch the report when component mounts / Виклик функції для отримання звіту при монтуванні компонента
    }, []); // Empty dependency array means this effect runs only once / Порожній масив залежностей означає, що цей ефект виконується лише один раз

    return (
        <Box> {/* Container for the project status report / Контейнер для звіту про статус проєкту */}
            <Typography variant="h4" gutterBottom>Project Status Report</Typography> {/* Title for the report section / Заголовок секції звіту */}
            <List> {/* List container for displaying projects / Контейнер списку для відображення проєктів */}
                {report.map((project, index) => ( // Iterate over each project in the report / Перебір кожного проєкту у звіті
                    <React.Fragment key={index}> {/* Wrapper to hold list items and dividers / Обгортка для елементів списку та розділювачів */}
                        <ListItem> {/* List item for individual project / Елемент списку для окремого проєкту */}
                            <Typography variant="h6">{project.title}</Typography> {/* Project title / Назва проєкту */}
                            <Typography variant="body1">Status: {project.status}</Typography> {/* Project status / Статус проєкту */}
                            <Typography variant="body2">Start Date: {new Date(project.startDate).toLocaleDateString()}</Typography> {/* Formatted start date / Форматована дата початку */}
                            <Typography variant="body2">End Date: {new Date(project.endDate).toLocaleDateString()}</Typography> {/* Formatted end date / Форматована дата завершення */}
                        </ListItem>
                        {index < report.length - 1 && <Divider />} {/* Divider between projects, except after the last one / Розділювач між проєктами, крім останнього */}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default ProjectStatusReport; // Export the component / Експорт компонента
