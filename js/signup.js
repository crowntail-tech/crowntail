document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Prepare payload
        const payload = {
            name,
            email,
            password
        };

        try {
            // Call API
            const response = await fetch('http://127.0.0.1:8000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.status==201) {
                alert('Signup successful!');
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                const error = await response.json();
                alert(`Signup failed: ${error.message}`);
            }
        } catch (error) {
            alert(`An error occurred. Please try again later.${error}`);
        }
    });
});
