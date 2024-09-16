import React from 'react'; // Import React / Імпорт React
import { Box } from '@mui/material'; // Import Box component from Material-UI / Імпорт компоненту Box з Material-UI
import ProjectStatusReport from '../components/ProjectStatusReport'; // Import ProjectStatusReport component / Імпорт компоненту ProjectStatusReport

// Component to display the Project Status Report page / Компонент для відображення сторінки звіту про стан проекту
const ProjectStatusReportPage = () => {
    return (
        <Box sx={{ padding: 2 }}> {/* Wrapper with padding for layout / Контейнер з відступами для макету */}
            <ProjectStatusReport /> {/* Render the ProjectStatusReport component / Відображення компоненту ProjectStatusReport */}
        </Box>
    );
};

export default ProjectStatusReportPage; // Export the component / Експорт компоненту
