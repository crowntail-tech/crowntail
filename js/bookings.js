import { checkAndLogout } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAndLogout();
    const bookingsTitle = document.getElementById('bookings-title');
    const bookingsSection = document.getElementById('bookings-section');
    const bookingsList = document.getElementById('bookings-list');
    const filterStatus = document.getElementById('filter-status');
    const logoutButton = document.getElementById('logout-link');
    const token = localStorage.getItem('jwt_token');

    let bookings = []; // Store bookings globally for filtering

    // Fetch and display bookings
    const fetchBookings = async () => {
        try {
            const response = await fetch('https://aerolink-backend-2b4e.onrender.com/user/bookings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch bookings.');

            bookings = await response.json();

            if (bookings.length === 0) {
                bookingsTitle.textContent = "You have no current bookings.";
                return;
            }

            bookingsTitle.textContent = "Your Bookings";
            bookingsSection.style.display = "block";
            renderBookings(bookings);
        } catch (error) {
            console.error("Error:", error);
            bookingsTitle.textContent = "Something went wrong. Please try again later.";
        }
    };

    // Render bookings based on data
    const renderBookings = (data) => {
        bookingsList.innerHTML = ''; // Clear existing bookings
        data.forEach(booking => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${booking.provider}</h3>
                <p>Booking Date: ${booking.date}</p>
                <p>Status: ${booking.status}</p>
                ${booking.status === 'Active' ? `<button class="cancel-btn" onclick="cancelBooking('${booking.id}')">Cancel</button>` : ''}
            `;
            bookingsList.appendChild(card);
        });
    };

    // Cancel booking
    window.cancelBooking = async (id) => {
        try {
            const response = await fetch(`https://api.example.com/bookings/${id}`, { 
                method: 'DELETE' 
            });

            if (!response.ok) throw new Error('Failed to cancel booking.');
            alert('Booking cancelled successfully.');

            // Update bookings after cancellation
            bookings = bookings.filter(booking => booking.id !== id);
            renderBookings(bookings);
        } catch (error) {
            console.error("Error:", error);
            alert('Unable to cancel booking. Please try again.');
        }
    };

    // Filter bookings
    filterStatus.addEventListener('change', (event) => {
        const status = event.target.value;

        if (status === 'all') {
            renderBookings(bookings);
        } else {
            const filtered = bookings.filter(booking => booking.status.toLowerCase() === status);
            renderBookings(filtered);
        }
    });

    // Fetch bookings on page load
    fetchBookings();

    logoutButton.addEventListener('click', () => {
        console.log("Logout clicked");
        localStorage.removeItem('jwt_token');  // Clear the token
        localStorage.removeItem('loged_in');
        window.location.href = 'login.html';   // Redirect to login page
    });

});
