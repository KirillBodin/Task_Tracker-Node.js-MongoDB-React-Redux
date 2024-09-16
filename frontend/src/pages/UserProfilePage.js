import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks / Імпортуємо React, useState, та useEffect
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks from react-redux / Імпортуємо хуки з react-redux
import { updateUserProfile, fetchUserProfile } from '../redux/userSlice'; // Importing actions / Імпортуємо дії
import { Box, Typography, TextField, Button, Avatar } from '@mui/material'; // Importing Material-UI components / Імпортуємо компоненти Material-UI
import { useTheme } from '@mui/material/styles'; // Importing useTheme for theming / Імпортуємо useTheme для роботи з темами
import ActivityFeed from "../components/ActivityFeed"; // Import ActivityFeed component / Імпортуємо компонент ActivityFeed

const UserProfilePage = () => {
    const dispatch = useDispatch(); // Initialize dispatch for Redux actions / Ініціалізуємо dispatch для дій Redux
    const userProfile = useSelector((state) => state.user.profile); // Get user profile from Redux state / Отримуємо профіль користувача зі стану Redux
    const [username, setUsername] = useState(''); // State for username / Стан для імені користувача
    const [email, setEmail] = useState(''); // State for email / Стан для електронної пошти
    const [profilePicture, setProfilePicture] = useState(null); // State for profile picture file / Стан для файлу аватара
    const [profilePicturePreview, setProfilePicturePreview] = useState(null); // State for profile picture preview / Стан для попереднього перегляду аватара
    const theme = useTheme(); // Use theme for styling / Використовуємо тему для стилізації

    const BASE_URL = 'http://localhost:5000/'; // Replace with your server's base URL / Замініть на базову URL вашого сервера

    useEffect(() => {
        dispatch(fetchUserProfile()); // Fetch user profile when component mounts / Отримуємо профіль користувача при монтованні компонента
    }, [dispatch]); // Run this effect only on initial render / Виконується цей ефект лише при першому рендерингу

    useEffect(() => {
        if (userProfile) { // If user profile is loaded / Якщо профіль користувача завантажено
            setUsername(userProfile.username); // Set username / Встановлюємо ім'я користувача
            setEmail(userProfile.email); // Set email / Встановлюємо електронну пошту
            setProfilePicture(userProfile.profilePicture); // Set profile picture / Встановлюємо аватар
            const previewUrl = BASE_URL + userProfile.profilePicture; // Create preview URL / Створюємо URL для попереднього перегляду
            setProfilePicturePreview(previewUrl); // Set preview URL / Встановлюємо URL попереднього перегляду
        }
    }, [userProfile]); // Run this effect when userProfile changes / Виконується цей ефект при зміні userProfile

    const handleProfilePictureChange = (event) => { // Handle profile picture change / Обробляємо зміну аватара
        const file = event.target.files[0]; // Get the selected file / Отримуємо вибраний файл
        setProfilePicture(file); // Set profile picture / Встановлюємо аватар

        if (file) { // If a file is selected / Якщо файл обрано
            const previewUrl = URL.createObjectURL(file); // Create preview URL / Створюємо URL для попереднього перегляду
            setProfilePicturePreview(previewUrl); // Set preview URL / Встановлюємо URL попереднього перегляду
        }
    };

    const handleSaveChanges = () => { // Handle save changes / Обробляємо збереження змін
        const formData = new FormData(); // Create form data object / Створюємо об'єкт форми даних
        formData.append('username', username); // Add username to form data / Додаємо ім'я користувача до форми даних
        formData.append('email', email); // Add email to form data / Додаємо електронну пошту до форми даних
        if (profilePicture instanceof File) { // Check if profile picture is a file / Перевіряємо, чи є аватар файлом
            formData.append('profilePicture', profilePicture); // Add profile picture to form data / Додаємо аватар до форми даних
        }
        dispatch(updateUserProfile(formData)).then(() => { // Dispatch update profile action / Викликаємо дію оновлення профілю
            dispatch(fetchUserProfile()); // Fetch updated profile / Отримуємо оновлений профіль
        });
    };

    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light} 100%)`,
                color: theme.palette.text.primary,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                maxWidth: '600px',
                margin: 'auto',
                marginTop: 5,
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    color: theme.palette.primary.dark,
                    fontWeight: 'bold',
                    marginBottom: 3,
                }}
            >
                Profile Settings {/* Title for the section / Заголовок розділу */}
            </Typography>
            <Avatar
                src={profilePicturePreview} // Display profile picture preview / Відображаємо попередній перегляд аватара
                sx={{
                    width: 120,
                    height: 120,
                    margin: 'auto',
                    marginBottom: 2,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)', // Enlarge on hover / Збільшуємо при наведенні
                    },
                }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange} // Handle file input change / Обробляємо зміну файлу
                style={{
                    margin: '20px 0',
                    color: theme.palette.text.primary,
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            />
            <TextField
                label="Username" // Label for username input / Мітка для введення імені користувача
                value={username} // Value of username / Значення імені користувача
                onChange={(e) => setUsername(e.target.value)} // Handle username change / Обробляємо зміну імені користувача
                fullWidth
                sx={{
                    marginBottom: 2,
                    input: { color: theme.palette.text.primary },
                    label: { color: theme.palette.text.secondary },
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
            />
            <TextField
                label="Email" // Label for email input / Мітка для введення електронної пошти
                value={email} // Value of email / Значення електронної пошти
                onChange={(e) => setEmail(e.target.value)} // Handle email change / Обробляємо зміну електронної пошти
                fullWidth
                sx={{
                    marginBottom: 3,
                    input: { color: theme.palette.text.primary },
                    label: { color: theme.palette.text.secondary },
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
            />
            <Button
                variant="contained"
                onClick={handleSaveChanges} // Handle save button click / Обробляємо натискання кнопки збереження
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                }}
            >
                Save Changes {/* Save button label / Мітка кнопки збереження */}
            </Button>

            {/* Display User Activity / Відображення активності користувача */}
            <ActivityFeed userId={userProfile?._id} /> {/* Display the user's activity feed / Відображаємо стрічку активності користувача */}
        </Box>
    );
};

export default UserProfilePage; // Exporting the component / Експортуємо компонент

