/* dream/js/navigation.js */

export const Navigation = {
    init() {
        // Handle Landing Page smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Sticky Nav Logic
        const nav = document.querySelector('.glass-nav');
        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.style.padding = "8px 20px";
                    nav.style.background = "rgba(255, 255, 255, 0.9)";
                } else {
                    nav.style.padding = "12px 24px";
                    nav.style.background = "rgba(255, 255, 255, 0.75)";
                }
            });
        }
    }
};

// Auto-init if not imported as module
document.addEventListener('DOMContentLoaded', () => Navigation.init());
