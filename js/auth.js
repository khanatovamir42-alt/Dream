/* dream/js/auth.js */
import { StorageService } from './services/storageService.js';
import { UserProfile } from './models/UserProfile.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Create a new UserProfile instance
            const newUser = new UserProfile({
                name: name,
                email: email,
                streak: 0,
                xp: 0,
                treeStage: 'seed'
            });

            // Persist user data
            StorageService.save('user_profile', newUser);
            
            // Set a simple auth flag
            StorageService.save('is_authenticated', true);

            // Redirect to onboarding
            window.location.href = 'onboarding.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // For a static demo, we check if a user profile exists
            const existingUser = StorageService.load('user_profile');
            
            if (existingUser) {
                StorageService.save('is_authenticated', true);
                window.location.href = 'app.html';
            } else {
                alert("No account found. Please register first.");
            }
        });
    }
});
