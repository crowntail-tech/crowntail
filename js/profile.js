import { checkAndLogout } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAndLogout();
    const form = document.getElementById('profile-form');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const profileUpload = document.getElementById('profile-upload');
    const inputs = document.querySelectorAll('#profile-form input');
    const logoutButton = document.getElementById('logout-link');

    let initialFormData = {};

    // Get the JWT token (this should be at the top)
    const token = localStorage.getItem('jwt_token');  // Get the JWT token

    // Fetch and load profile data
    const fetchProfileData = async () => {
        const response = await fetch('https://aerolink-backend-2b4e.onrender.com/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            inputs.forEach(input => input.value = data[input.name] || '');
            // Set profile picture if available
            document.getElementById('profile-pic').src = `http://localhost:8000/user${data.profile_picture}` || 'images/default-profile.png';
        } else {
            alert('Failed to fetch profile data.');
        }
    };

    // Enable Editing
    editBtn.addEventListener('click', () => {
        inputs.forEach(input => input.removeAttribute('readonly'));
        profileUpload.removeAttribute('disabled');
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        editBtn.style.display = 'none';

        // Store initial data for cancel
        initialFormData = {};
        inputs.forEach(input => initialFormData[input.id] = input.value);
    });

    // Cancel Editing
    cancelBtn.addEventListener('click', () => {
        inputs.forEach(input => {
            input.setAttribute('readonly', true);
            input.value = initialFormData[input.id];
        });
        profileUpload.setAttribute('disabled', true);
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        editBtn.style.display = 'inline-block';
    });

    // Submit Updated Data
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const payload = {};
        inputs.forEach(input => payload[input.name] = input.value);

        // Handle Profile Picture Upload (simplified)
        if (profileUpload.files.length > 0) {
            const formData = new FormData();
            formData.append('file', profileUpload.files[0]);

            const uploadResponse = await fetch('https://aerolink-backend-2b4e.onrender.com/user/upload-profile-picture', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (uploadResponse.ok) {
                const uploadData = await uploadResponse.json();
                payload.profile_picture = uploadData.url;  // Assuming the server returns the file URL
            }
        }

        const response = await fetch('https://aerolink-backend-2b4e.onrender.com/user/profile/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Profile updated successfully!');
            window.location.reload();
        } else {
            alert('Failed to update profile.');
        }
    });

    fetchProfileData();
    logoutButton.addEventListener('click', () => {
        console.log("Logout clicked");
        localStorage.removeItem('jwt_token');  // Clear the token
        localStorage.removeItem('loged_in');
        window.location.href = 'login.html';   // Redirect to login page
    });
});
