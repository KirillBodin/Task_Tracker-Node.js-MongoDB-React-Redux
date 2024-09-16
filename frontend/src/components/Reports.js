import React, { useState } from 'react'; // Import React and useState for managing state / Імпорт React та useState для управління станом
import axios from 'axios'; // Import Axios for making HTTP requests / Імпорт Axios для виконання HTTP-запитів
import {
    Box, Typography, FormControl, InputLabel, Select, MenuItem, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { jsPDF } from 'jspdf'; // Import jsPDF for generating PDF reports / Імпорт jsPDF для створення PDF-звітів
import 'jspdf-autotable'; // Import plugin for jsPDF to generate tables / Імпорт плагіну для jsPDF для створення таблиць
import { format } from 'date-fns'; // Import date-fns for date formatting / Імпорт date-fns для форматування дат

const Reports = () => {
    const [reportType, setReportType] = useState('projectStatus'); // State to store selected report type / Стан для зберігання обраного типу звіту
    const [reportData, setReportData] = useState([]); // State to store fetched report data / Стан для зберігання отриманих даних звіту

    // Fetch report data based on selected report type / Отримати дані звіту на основі обраного типу звіту
    const fetchReportData = async () => {
        let apiUrl = ''; // Initialize variable to store API endpoint / Ініціалізація змінної для зберігання кінцевої точки API

        if (reportType === 'projectStatus') { // Check report type and set API endpoint / Перевірка типу звіту та встановлення кінцевої точки API
            apiUrl = '/api/reports/projects';
        } else if (reportType === 'taskCompletion') {
            apiUrl = '/api/reports/tasks';
        }

        try {
            const { data } = await axios.get(apiUrl); // Fetch data from the server / Отримати дані з сервера
            setReportData(data); // Store fetched data in state / Зберегти отримані дані в стані
        } catch (error) {
            console.error('Error fetching report data:', error); // Log error if request fails / Вивести помилку, якщо запит не вдався
        }
    };

    // Handle report type selection change / Обробка зміни обраного типу звіту
    const handleReportTypeChange = (event) => {
        setReportType(event.target.value); // Update report type state / Оновити стан типу звіту
        setReportData([]); // Clear current report data when type changes / Очистити поточні дані звіту при зміні типу
    };

    // Generate a PDF report using jsPDF / Створення PDF-звіту за допомогою jsPDF
    const generatePDFReport = () => {
        const doc = new jsPDF(); // Initialize jsPDF document / Ініціалізація документа jsPDF

        doc.setFontSize(18); // Set font size for the title / Встановлення розміру шрифту для заголовку
        doc.text('Report', 14, 22); // Add title text to the document / Додати текст заголовку до документа

        // Generate different tables based on report type / Генерація різних таблиць на основі типу звіту
        if (reportType === 'projectStatus') {
            const tableColumn = ["Project", "Start Date", "End Date", "Developers", "Tasks", "Time Spent (hours)", "Comments"]; // Define columns for the table / Визначення стовпців таблиці
            const tableRows = []; // Array to hold table row data / Масив для зберігання даних рядків таблиці

            reportData.forEach(project => { // Iterate over each project to format data / Перебір кожного проєкту для форматування даних
                const projectData = [
                    project.title,
                    project.startDate ? format(new Date(project.startDate), 'PPpp') : 'N/A', // Format start date / Форматування дати початку
                    project.endDate ? format(new Date(project.endDate), 'PPpp') : 'N/A', // Format end date / Форматування дати завершення
                    project.developersCount,
                    project.tasksCount,
                    project.timeSpent,
                    project.commentsCount || 0
                ];
                tableRows.push(projectData); // Add formatted data to table rows / Додати відформатовані дані до рядків таблиці
            });

            // Generate table in the PDF document / Генерація таблиці в PDF-документі
            doc.autoTable({
                head: [tableColumn], // Define table header / Визначення заголовку таблиці
                body: tableRows, // Define table body / Визначення тіла таблиці
                startY: 30, // Starting position for the table / Початкова позиція для таблиці
                styles: { fontSize: 12, cellPadding: 4 }, // Set styles for table cells / Встановлення стилів для клітинок таблиці
                headStyles: { fillColor: [22, 160, 133] }, // Set header styles / Встановлення стилів заголовку
                alternateRowStyles: { fillColor: [240, 240, 240] }, // Set alternate row styles / Встановлення стилів чергування рядків
            });
        } else if (reportType === 'taskCompletion') {
            const tableColumn = ["Task", "Start Date", "End Date", "Status", "Comments"]; // Define columns for the task completion table / Визначення стовпців для таблиці виконання завдань
            const tableRows = []; // Array to hold task data / Масив для зберігання даних завдань

            reportData.forEach(task => { // Iterate over each task to format data / Перебір кожного завдання для форматування даних
                const taskData = [
                    task.title,
                    task.startDate ? format(new Date(task.startDate), 'PPpp') : 'N/A', // Format start date / Форматування дати початку
                    task.endDate ? format(new Date(task.endDate), 'PPpp') : 'N/A', // Format end date / Форматування дати завершення
                    task.status,
                    task.commentsCount || 0
                ];
                tableRows.push(taskData); // Add task data to table rows / Додати дані завдань до рядків таблиці
            });

            // Generate table in the PDF document / Генерація таблиці в PDF-документі
            doc.autoTable({
                head: [tableColumn], // Define table header / Визначення заголовку таблиці
                body: tableRows, // Define table body / Визначення тіла таблиці
                startY: 30, // Starting position for the table / Початкова позиція для таблиці
                styles: { fontSize: 12, cellPadding: 4 }, // Set styles for table cells / Встановлення стилів для клітинок таблиці
                headStyles: { fillColor: [22, 160, 133] }, // Set header styles / Встановлення стилів заголовку
                alternateRowStyles: { fillColor: [240, 240, 240] }, // Set alternate row styles / Встановлення стилів чергування рядків
            });
        }

        doc.save(`${reportType}_Report.pdf`); // Save the PDF with a filename based on report type / Зберегти PDF з назвою файлу на основі типу звіту
    };

    return (
        <Box sx={{ padding: 3 }}> {/* Container for the reports section / Контейнер для секції звітів */}
            <Typography variant="h4" gutterBottom>Reports</Typography> {/* Header for the reports section / Заголовок секції звітів */}

            <FormControl fullWidth sx={{ marginBottom: 3 }}> {/* Dropdown for selecting report type / Випадаючий список для вибору типу звіту */}
                <InputLabel id="report-type-label">Report Type</InputLabel>
                <Select
                    labelId="report-type-label" // ID for the dropdown label / Ідентифікатор для мітки списку
                    id="report-type" // ID for the dropdown / Ідентифікатор списку
                    value={reportType} // Bind selected value to reportType state / Прив'язка вибраного значення до стану reportType
                    onChange={handleReportTypeChange} // Handle changes in selected value / Обробка змін вибраного значення
                >
                    <MenuItem value="projectStatus">Project Status</MenuItem> {/* Option for project status report / Варіант для звіту про статус проєкту */}
                    <MenuItem value="taskCompletion">Task Completion</MenuItem> {/* Option for task completion report / Варіант для звіту про виконання завдань */}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={fetchReportData} // Fetch data on button click / Отримати дані при натисканні кнопки
                sx={{ marginRight: 2 }}
            >
                Generate Report {/* Button text / Текст кнопки */}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={generatePDFReport} // Generate PDF on button click / Створити PDF при натисканні кнопки
            >
                Download Report as PDF {/* Button text / Текст кнопки */}
            </Button>

            {reportData.length > 0 && ( // Conditional rendering if there is report data / Умовне відображення, якщо є дані звіту
                <Box sx={{ marginTop: 4 }}> {/* Container for the report preview / Контейнер для попереднього перегляду звіту */}
                    <Typography variant="h6" gutterBottom>Report Preview</Typography> {/* Header for the preview / Заголовок для попереднього перегляду */}
                    <TableContainer component={Paper}> {/* Table container / Контейнер для таблиці */}
                        <Table>
                            <TableHead> {/* Table header / Заголовок таблиці */}
                                <TableRow>
                                    {reportType === 'projectStatus' ? ( // Render columns based on report type / Відображення стовпців на основі типу звіту
                                        <>
                                            <TableCell>Project</TableCell>
                                            <TableCell>Start Date</TableCell>
                                            <TableCell>End Date</TableCell>
                                            <TableCell>Developers</TableCell>
                                            <TableCell>Tasks</TableCell>
                                            <TableCell>Time Spent (hours)</TableCell>
                                            <TableCell>Comments</TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>Task</TableCell>
                                            <TableCell>Start Date</TableCell>
                                            <TableCell>End Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Comments</TableCell>
                                        </>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody> {/* Table body / Тіло таблиці */}
                                {reportType === 'projectStatus' && reportData.map((project, index) => ( // Render rows for project status report / Відображення рядків для звіту про статус проєкту
                                    <TableRow key={index}>
                                        <TableCell>{project.title}</TableCell>
                                        <TableCell>{project.startDate ? format(new Date(project.startDate), 'PPpp') : 'N/A'}</TableCell>
                                        <TableCell>{project.endDate ? format(new Date(project.endDate), 'PPpp') : 'N/A'}</TableCell>
                                        <TableCell>{project.developersCount}</TableCell>
                                        <TableCell>{project.tasksCount}</TableCell>
                                        <TableCell>{project.timeSpent}</TableCell>
                                        <TableCell>{project.commentsCount || 0}</TableCell>
                                    </TableRow>
                                ))}
                                {reportType === 'taskCompletion' && reportData.map((task, index) => ( // Render rows for task completion report / Відображення рядків для звіту про виконання завдань
                                    <TableRow key={index}>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.startDate ? format(new Date(task.startDate), 'PPpp') : 'N/A'}</TableCell>
                                        <TableCell>{task.endDate ? format(new Date(task.endDate), 'PPpp') : 'N/A'}</TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        <TableCell>{task.commentsCount || 0}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
};

export default Reports; // Export the Reports component / Експорт компонента Reports
