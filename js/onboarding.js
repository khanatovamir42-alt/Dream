/* dream/js/onboarding.js */
import { StorageService } from './services/storageService.js';
import { UserProfile } from './models/UserProfile.js';

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 5;
    const userData = StorageService.load('user_profile') || {};

    const steps = document.querySelectorAll('.onboarding-step');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const progressFill = document.getElementById('progress-fill');
    const stepNumDisplay = document.getElementById('current-step-num');

    // Handle Option Card Clicks
    document.querySelectorAll('.option-card, .mode-card').forEach(card => {
        card.addEventListener('click', () => {
            const parent = card.parentElement;
            parent.querySelectorAll('.option-card, .mode-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            // Auto-advance for card selections to feel snappy
            setTimeout(() => btnNext.click(), 300);
        });
    });

    // Handle Suggestions
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.getElementById('user-goal').value = chip.textContent;
        });
    });

    btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            saveStepData(currentStep);
            currentStep++;
            updateUI();
        } else {
            saveStepData(currentStep);
            finalizeOnboarding();
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    function updateUI() {
        // Update steps
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });

        // Update progress bar
        const percent = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${percent}%`;
        stepNumDisplay.textContent = currentStep;

        // Update buttons
        btnBack.classList.toggle('hidden', currentStep === 1);
        btnNext.textContent = currentStep === totalSteps ? 'Finish' : 'Next';
    }

    function saveStepData(step) {
        switch(step) {
            case 1: userData.goal = document.getElementById('user-goal').value; break;
            case 2: userData.reason = document.getElementById('user-reason').value; break;
            case 3: 
                const levelCard = document.querySelector('.onboarding-step[data-step="3"] .selected');
                if (levelCard) userData.experienceLevel = levelCard.dataset.value;
                break;
            case 4:
                const styleCard = document.querySelector('.onboarding-step[data-step="4"] .selected');
                if (styleCard) userData.learningStyle = styleCard.dataset.value;
                break;
            case 5:
                const modeCard = document.querySelector('.onboarding-step[data-step="5"] .selected');
                if (modeCard) userData.interventionMode = modeCard.dataset.value;
                break;
        }
    }

    function finalizeOnboarding() {
        const finalProfile = new UserProfile(userData);
        StorageService.save('user_profile', finalProfile);
        StorageService.save('onboarding_complete', true);
        window.location.href = 'app.html';
    }
});
