// Function to decode JWT token and check expiration
function isTokenExpired(token) {
    if (!token) return true;

    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token

    const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

    return decoded.exp < currentTime; // Return true if the token is expired
}

// Function to check if the token is expired and log out the user
function checkAndLogout() {
    const token = localStorage.getItem('jwt_token');

    if (isTokenExpired(token)) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('jwt_token'); // Remove the expired token
        localStorage.removeItem('loged_in');
        window.location.href = 'login.html'; // Redirect to the login page
    }
}

// Export the functions if you're using modules, or just use them directly
export { checkAndLogout };
