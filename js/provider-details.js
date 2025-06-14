document.addEventListener('DOMContentLoaded', () => {
    const providerName = document.getElementById('provider-name');
    const providerSpeed = document.getElementById('provider-speed');
    const providerRating = document.getElementById('provider-rating');
    const providerPrice = document.getElementById('provider-price');
    const providerDescription = document.getElementById('provider-description');
    const bookBtn = document.getElementById('book-btn');

    const bookingsLink = document.getElementById('bookings-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');

    let isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

    // Show or hide navigation links based on login status
    const handleNavigationLinks = () => {
        if (isLoggedIn) {
            bookingsLink.style.display = 'inline-block';
            profileLink.style.display = 'inline-block';
            logoutLink.style.display = 'inline-block';
            loginLink.style.display = 'none';
        } else {
            bookingsLink.style.display = 'none';
            profileLink.style.display = 'none';
            logoutLink.style.display = 'none';
            loginLink.style.display = 'inline-block';
        }
    };

    // Fetch provider details dynamically
    const fetchProviderDetails = async () => {
        try {
            // Simulated API endpoint
            const response = await fetch('https://api.example.com/provider-details?id=1');
            if (!response.ok) throw new Error('Failed to fetch provider details');

            const provider = await response.json();

            // Populate provider details
            providerName.textContent = provider.name || 'N/A';
            providerSpeed.textContent = provider.speed || 'N/A';
            providerRating.textContent = provider.rating || 'N/A';
            providerPrice.textContent = provider.price || 'N/A';
            providerDescription.textContent = provider.description || 'N/A';
        } catch (error) {
            console.error('Error fetching provider details:', error);
            providerName.textContent = 'Provider Details Unavailable';
            providerDescription.textContent = 'We are unable to fetch details at the moment. Please try again later.';
            bookBtn.style.display = 'none'; // Hide the booking button
        }
    };

    // Handle Book Now button click
    const handleBookNow = () => {
        bookBtn.addEventListener('click', () => {
            if (!isLoggedIn) {
                alert("Please log in to book this provider.");
                window.location.href = 'login.html'; // Redirect to Login
            } else {
                // Simulate booking logic
                alert(`Booking initiated for ${providerName.textContent}`);
                simulateBooking();
            }
        });
    };

    // Simulate booking action
    const simulateBooking = () => {
        // Simulate an API call for booking confirmation
        setTimeout(() => {
            alert('Booking confirmed! Thank you for choosing Aero Link.');
        }, 1000);
    };

    // Logout Logic
    const handleLogout = () => {
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('userLoggedIn'); // Remove login status
            alert('You have been logged out.');
            window.location.href = 'index.html'; // Redirect to Home
        });
    };

    // Initialize Page
    const initializePage = () => {
        handleNavigationLinks();
        fetchProviderDetails();
        handleBookNow();
        handleLogout();
    };

    // Start the script
    initializePage();
});
