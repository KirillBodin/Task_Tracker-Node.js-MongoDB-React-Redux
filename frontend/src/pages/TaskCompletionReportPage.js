import React from 'react'; // Import React / Імпорт React
import { Box } from '@mui/material'; // Import Box component from Material-UI / Імпорт компоненту Box з Material-UI
import TaskCompletionReport from '../components/TaskCompletionReport'; // Import TaskCompletionReport component / Імпорт компоненту TaskCompletionReport

// Component for the task completion report page / Компонент для сторінки звіту про виконання завдань
const TaskCompletionReportPage = () => {
    return (
        <Box sx={{ padding: 2 }}> {/* Container for the report / Контейнер для звіту */}
            <TaskCompletionReport /> {/* Rendering the TaskCompletionReport component / Відображення компоненту TaskCompletionReport */}
        </Box>
    );
};

export default TaskCompletionReportPage; // Export the component / Експортуємо компонент
