document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const responseMessage = document.getElementById('form-response');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Simulate API call
            const response = await fetch('https://api.example.com/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to send message.');

            responseMessage.textContent = 'Your message has been sent successfully!';
            responseMessage.style.color = 'green';
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            responseMessage.textContent = 'Something went wrong. Please try again later.';
            responseMessage.style.color = 'red';
        }
    });
});
