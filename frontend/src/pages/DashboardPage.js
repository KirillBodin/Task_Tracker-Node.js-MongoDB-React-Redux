import React from 'react'; // Import React / Імпорт React
import { Box } from '@mui/material'; // Import Box component from Material-UI for layout / Імпорт компонента Box з Material-UI для розміщення
import DashboardAnalytics from '../components/DashboardAnalytics'; // Import the DashboardAnalytics component / Імпорт компонента DashboardAnalytics

// DashboardPage component to display the dashboard analytics / Компонент DashboardPage для відображення аналітики дашборду
const DashboardPage = () => {
    return (
        <Box sx={{ padding: 2 }}> {/* Container with padding / Контейнер з відступами */}
            <DashboardAnalytics /> {/* Render the DashboardAnalytics component / Відображення компонента DashboardAnalytics */}
        </Box>
    );
};

export default DashboardPage; // Export the DashboardPage component / Експорт компонента DashboardPage
