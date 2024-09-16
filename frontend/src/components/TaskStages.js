import React from 'react'; // Import React for creating the component / Імпорт React для створення компонента
import { useDispatch, useSelector } from 'react-redux'; // Import hooks to interact with the Redux store / Імпорт хуків для взаємодії з Redux store
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import components for drag-and-drop functionality / Імпорт компонентів для функціоналу drag-and-drop
import { Paper, Box, Typography } from '@mui/material'; // Import Material-UI components / Імпорт компонентів Material-UI
import { updateTask } from '../redux/taskSlice'; // Import action for updating tasks / Імпорт дії для оновлення завдань

// Component for task stages panels / Компонент для панелей зі стадіями
const TaskStages = () => {
    const dispatch = useDispatch(); // Initialize dispatch to send actions to the store / Ініціалізація dispatch для відправлення дій до store
    const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from the Redux store / Отримати завдання з Redux store

    const stages = ['Backlog', 'In Progress', 'Review', 'Done']; // Define task stages / Визначення стадій завдань

    // Handler for drag end event / Обробник завершення події перетягування
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result; // Destructure result object / Деструктуруємо об'єкт result

        if (!destination) {
            return; // If there's no destination, exit the function / Якщо немає місця призначення, вийти з функції
        }

        // If the task is dropped in the same position, do nothing / Якщо завдання було відпущено на тій же позиції, нічого не робити
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const task = tasks.find((task) => task._id === draggableId); // Find the task by its ID / Знайти завдання за його ID
        dispatch(updateTask({ ...task, status: destination.droppableId })); // Dispatch action to update task's status / Відправити дію для оновлення статусу завдання
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}> {/* Initialize drag-and-drop context / Ініціалізація контексту drag-and-drop */}
            <Box display="flex" justifyContent="space-between"> {/* Container for task stages / Контейнер для стадій завдань */}
                {stages.map((stage) => ( // Iterate over each stage / Перебір кожної стадії
                    <Paper
                        elevation={3}
                        key={stage}
                        sx={{ width: '23%', padding: '8px' }} // Styling for each stage panel / Стилізація для кожної панелі стадії
                    >
                        <Typography variant="h6" gutterBottom>{stage}</Typography> {/* Stage title / Заголовок стадії */}
                        <Droppable droppableId={stage}> {/* Define droppable area for the stage / Визначення зони, куди можна перетягувати завдання */}
                            {(provided) => (
                                <Box
                                    ref={provided.innerRef} // Reference for the droppable area / Посилання на зону, куди можна перетягувати
                                    {...provided.droppableProps} // Props for droppable area / Властивості для зони, куди можна перетягувати
                                    sx={{ minHeight: '200px' }} // Minimum height for droppable area / Мінімальна висота зони, куди можна перетягувати
                                >
                                    {tasks
                                        .filter((task) => task.status === stage) // Filter tasks by current stage / Фільтрувати завдання за поточною стадією
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}> {/* Define draggable task / Визначення елементу, який можна перетягувати */}
                                                {(provided) => (
                                                    <Paper
                                                        ref={provided.innerRef} // Reference for the draggable element / Посилання на елемент, який можна перетягувати
                                                        {...provided.draggableProps} // Props for draggable element / Властивості для елементу, який можна перетягувати
                                                        {...provided.dragHandleProps} // Props for drag handle / Властивості для ручки перетягування
                                                        sx={{ marginBottom: '8px', padding: '8px' }} // Styling for each task card / Стилізація для кожної картки завдання
                                                    >
                                                        <Typography variant="body1">{task.title}</Typography> {/* Display task title / Відображення назви завдання */}
                                                        <Typography variant="body2">{task.description}</Typography> {/* Display task description / Відображення опису завдання */}
                                                    </Paper>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder} {/* Placeholder for the drop area / Заповнювач для зони, куди можна перетягувати */}
                                </Box>
                            )}
                        </Droppable>
                    </Paper>
                ))}
            </Box>
        </DragDropContext>
    );
};

export default TaskStages; // Export TaskStages component / Експорт компонента TaskStages
