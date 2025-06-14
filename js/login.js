document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Prepare payload
        const payload = {
            email,
            password
        };

        try {
            // Call API
            const response = await fetch('https://aerolink-backend-2b4e.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt_token', data.access_token);
                localStorage.setItem('loged_in', true)
                alert('Login successful!');
                // Redirect to dashboard or homepage
                window.location.href = 'dashboard.html';
            } else {
                const error = await response.json();
                alert(`Login failed: ${error.message}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    });
});
