/* dream/js/lesson.js */
import { StorageService } from './services/storageService.js';
import { DreamTeacher } from './services/dreamTeacher.js';

export const Lesson = {
    currentStep: 0,
    lessonData: null,

    /**
     * Renders the lesson view.
     * @param {Object} user - UserProfile.
     * @param {Object} params - Context like lessonId.
     */
    render(user, params = {}) {
        const lessonId = params.lessonId || 'n2';
        // In a real app, we would fetch this from DreamTeacher service
        this.lessonData = this.getPlaceholderLesson(lessonId, user.goal);
        this.currentStep = 0;

        return `
            <div class="lesson-container">
                <div class="lesson-progress-wrapper">
                    <div class="lesson-progress-bar">
                        <div id="lesson-progress-fill" class="fill" style="width: 0%"></div>
                    </div>
                    <button class="exit-lesson" onclick="window.Dream.switchView('learning-path')">✕ Exit</button>
                </div>

                <div id="lesson-content-area" class="lesson-card glass animate-fade-in">
                    <!-- Step content will be injected here -->
                </div>

                <div class="lesson-controls">
                    <button id="lesson-back" class="btn-secondary hidden">Back</button>
                    <button id="lesson-next" class="btn-primary">Continue</button>
                </div>
            </div>
        `;
    },

    init(user) {
        this.updateStep();
        
        document.getElementById('lesson-next').addEventListener('click', () => this.nextStep(user));
        document.getElementById('lesson-back').addEventListener('click', () => this.prevStep());
    },

    updateStep() {
        const contentArea = document.getElementById('lesson-content-area');
        const nextBtn = document.getElementById('lesson-next');
        const backBtn = document.getElementById('lesson-back');
        const steps = this.lessonData.steps;
        const current = steps[this.currentStep];

        // Update Progress
        const progress = ((this.currentStep + 1) / steps.length) * 100;
        document.getElementById('lesson-progress-fill').style.width = `${progress}%`;

        // Inject Content
        contentArea.innerHTML = `
            <div class="step-content animate-fade-in">
                <span class="step-label">${current.type.toUpperCase()}</span>
                <h2>${current.title}</h2>
                <div class="step-body">${current.content}</div>
                ${current.type === 'exercise' ? this.renderExercise(current) : ''}
            </div>
        `;

        // Update Nav
        backBtn.classList.toggle('hidden', this.currentStep === 0);
        nextBtn.textContent = this.currentStep === steps.length - 1 ? 'Complete Lesson' : 'Continue';
    },

    nextStep(user) {
        if (this.currentStep < this.lessonData.steps.length - 1) {
            this.currentStep++;
            this.updateStep();
        } else {
            this.completeLesson(user);
        }
    },

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateStep();
        }
    },

    renderExercise(step) {
        return `
            <div class="interactive-box">
                <p>${step.question}</p>
                <div class="options-list">
                    ${step.options.map(opt => `<button class="option-btn">${opt}</button>`).join('')}
                </div>
            </div>
        `;
    },

    completeLesson(user) {
        // Update user state
        user.xp += 100;
        user.treeGrowthPoints += 10;
        if (!user.completedLessons) user.completedLessons = [];
        user.completedLessons.push(this.lessonData.id);
        
        // Save
        StorageService.save('user_profile', user);
        
        // Celebrate and Return
        document.getElementById('lesson-content-area').innerHTML = `
            <div class="completion-state text-center animate-fade-in">
                <div class="success-icon">🏆</div>
                <h2>Lesson Complete!</h2>
                <p>You earned 100 XP and grew your Dream Tree.</p>
                <button class="btn-primary" onclick="window.Dream.switchView('dashboard')">Return to Dashboard</button>
            </div>
        `;
        document.querySelector('.lesson-controls').style.display = 'none';
    },

    getPlaceholderLesson(id, goal) {
        return {
            id: id,
            title: `Foundations of ${goal}`,
            steps: [
                { type: 'intro', title: 'Welcome', content: `In this lesson, we will explore the fundamental principles of ${goal}. Understanding these is key to your long-term success.` },
                { type: 'concept', title: 'Core Principle #1', content: 'Consistency is more important than intensity. Small daily actions lead to massive transformations.' },
                { type: 'exercise', title: 'Quick Quiz', content: 'Apply what you just learned.', question: 'Which is better for long-term growth?', options: ['One 10-hour session', '30 minutes every day', 'Waiting for inspiration'] },
                { type: 'reflection', title: 'Final Thought', content: 'How will you apply this principle to your study schedule today?' }
            ]
        };
    }
};
