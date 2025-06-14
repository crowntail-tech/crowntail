// Add interactive behavior to the home page (e.g., animations, event listeners)

document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text h1');
    heroText.style.transition = 'transform 0.5s ease-in-out';
    heroText.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        heroText.style.transform = 'translateY(0)';
    }, 100);
});
