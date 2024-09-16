// Import necessary libraries and functions / Імпорт необхідних бібліотек та функцій
import React, { useState } from 'react'; // Import React and useState for state management / Імпорт React та useState для управління станом
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions / Імпорт useDispatch для відправлення дій
import { updateProject } from '../redux/projectSlice'; // Import action to update project / Імпорт дії для оновлення проекту

// Component for editing a project / Компонент для редагування проекту
const EditProjectForm = ({ project, onClose }) => {
    // Local state for project name and description / Локальний стан для імені та опису проекту
    const [name, setName] = useState(project.name); // State to hold project name / Стан для збереження імені проекту
    const [description, setDescription] = useState(project.description); // State to hold project description / Стан для збереження опису проекту
    const dispatch = useDispatch(); // Hook to dispatch actions to the store / Хук для відправлення дій до store

    // Handlers for changing name and description / Обробники зміни імені та опису
    const onNameChanged = (e) => setName(e.target.value); // Update state with new name / Оновлення стану новим ім'ям
    const onDescriptionChanged = (e) => setDescription(e.target.value); // Update state with new description / Оновлення стану новим описом

    // Handler for saving the project / Обробник збереження проекту
    const onSaveProjectClicked = () => {
        if (name && description) { // Check if name and description are not empty / Перевірка, що ім'я та опис не пусті
            dispatch(updateProject({ ...project, name, description })); // Dispatch action to update the project / Відправлення дії для оновлення проекту
            onClose(); // Close the form after saving / Закриваємо форму після збереження
        }
    };

    return (
        <section> {/* Section for the edit form / Секція для форми редагування */}
            <h2>Edit Project</h2> {/* Heading for the form / Заголовок для форми */}
            <form> {/* Form element / Елемент форми */}
                <label htmlFor="projectName">Project Name:</label> {/* Label for project name / Мітка для імені проекту */}
                <input
                    type="text" // Input for project name / Поле введення для імені проекту
                    id="projectName" // ID for input / Ідентифікатор для поля введення
                    name="projectName" // Name attribute for input / Атрибут name для поля введення
                    value={name} // Bind input to name state / Прив'язка поля введення до стану name
                    onChange={onNameChanged} // Update state on input change / Оновлення стану при зміні введення
                />
                <label htmlFor="projectDescription">Project Description:</label> {/* Label for project description / Мітка для опису проекту */}
                <textarea
                    id="projectDescription" // ID for textarea / Ідентифікатор для текстової області
                    name="projectDescription" // Name attribute for textarea / Атрибут name для текстової області
                    value={description} // Bind textarea to description state / Прив'язка текстової області до стану description
                    onChange={onDescriptionChanged} // Update state on input change / Оновлення стану при зміні введення
                />
                <button type="button" onClick={onSaveProjectClicked}> {/* Button to save the project / Кнопка для збереження проекту */}
                    Save Project {/* Button text / Текст кнопки */}
                </button>
            </form>
            <button type="button" onClick={onClose}> {/* Button to cancel editing / Кнопка для скасування редагування */}
                Cancel {/* Button text / Текст кнопки */}
            </button>
        </section>
    );
};

export default EditProjectForm; // Export the component / Експорт компонента
