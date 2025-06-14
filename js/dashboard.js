document.addEventListener('DOMContentLoaded', () => {
    // Check if the token is expired, and logout if necessary

    const dashboardTitle = document.getElementById('dashboard-title');
    const providersSection = document.getElementById('providers-section');
    const providersList = document.getElementById('providers-list');

    const bookingsLink = document.getElementById('bookings-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');
    const isLoggedIn = localStorage.getItem('loged_in');

    // Show or hide navigation links based on login status
    const handleNavigation = () => {
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

    // Fetch and load providers dynamically
    const fetchProviders = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/user/providers', {  // Correct API endpoint
                method: 'GET'
            });

            if (!response.ok) throw new Error('Failed to fetch providers.');

            const providers = await response.json();
            console.log(providers); // Check what data is being returned from the API

            if (providers.length === 0) {
                dashboardTitle.textContent = "No Providers Available"; // No data, so show message
                providersSection.style.display = "none";  // Hide providers section if no data
                return;
            }

            // Success: Render provider cards
            dashboardTitle.textContent = "Available WiFi Providers";
            providersSection.style.display = "block";

            providers.forEach(provider => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h3>${provider.name}</h3>
                    <p>Speed: ${provider.speed} Mbps</p>
                    <p>Rating: ${provider.rating} ⭐</p>
                    <button class="book-btn" data-id="${provider.id}">Book Now</button>
                `;
                providersList.appendChild(card);
            });

            attachBookButtonEvents();
        } catch (error) {
            console.error("Error:", error);
            dashboardTitle.textContent = "Something went wrong. Please try again.";
        }
    };

    // Attach events to all "Book Now" buttons
    const attachBookButtonEvents = () => {
        const bookButtons = document.querySelectorAll('.book-btn');
        bookButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const providerId = event.target.dataset.id;
                if (!isLoggedIn) {
                    alert('You need to log in to book a provider.');
                    window.location.href = 'login.html'; // Redirect to login page
                } else {
                    bookProvider(providerId);
                }
            });
        });
    };

    // Simulated Booking Action
    const bookProvider = (id) => {
        alert(`Booking initiated for provider ID: ${id}`);
    };

    // Initialize on page load
    handleNavigation();
    fetchProviders();
    logoutLink.addEventListener('click', () => {
        console.log("Logout clicked");
        localStorage.removeItem('jwt_token');  // Clear the token
        localStorage.removeItem('loged_in');
        window.location.href = 'login.html';   // Redirect to login page
    });

});
