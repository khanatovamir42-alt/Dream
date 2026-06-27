/* dream/js/app.js */
import { StorageService } from './services/storageService.js';
import { UserProfile } from './models/UserProfile.js';
import { Dashboard } from './dashboard.js';

class DreamApp {
    constructor() {
        this.user = null;
        this.currentView = 'dashboard';
        this.views = {
            'dashboard': Dashboard,
            // Future views will be added here
        };
        
        this.init();
    }

    async init() {
        console.log("Dream App Initializing...");
        
        // 1. Load User
        this.loadUser();

        // 2. Setup Global UI Listeners (Sidebar, Companion)
        this.setupNavigation();
        this.setupCompanion();
        this.setupInterventions();

        // 3. Render Initial View
        this.renderView(this.currentView);
        
        // 4. Update Header Stats
        this.updateGlobalStats();
    }

    loadUser() {
        const data = StorageService.load('user_profile');
        if (!data) {
            console.warn("No user profile found. Redirecting to onboarding.");
            window.location.href = 'index.html';
            return;
        }
        this.user = new UserProfile(data);
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const viewId = item.getAttribute('data-view');
                if (viewId && viewId !== this.currentView) {
                    this.switchView(viewId);
                }
            });
        });

        document.getElementById('global-continue-btn').addEventListener('click', () => {
            this.switchView('learning-path');
        });
    }

    switchView(viewId) {
        console.log(`Switching to view: ${viewId}`);
        this.currentView = viewId;

        // Update Sidebar UI
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-view') === viewId);
        });

        this.renderView(viewId);
    }

    async renderView(viewId) {
        const viewport = document.getElementById('content-view');
        
        // Animation Out
        viewport.style.opacity = '0';
        viewport.style.transform = 'translateY(10px)';

        setTimeout(async () => {
            // Get View Logic
            const viewModule = this.views[viewId];
            
            if (viewModule && viewModule.render) {
                viewport.innerHTML = viewModule.render(this.user);
                if (viewModule.init) viewModule.init(this.user);
            } else {
                viewport.innerHTML = `
                    <div class="coming-soon">
                        <span class="icon">🚧</span>
                        <h2>${viewId.charAt(0).toUpperCase() + viewId.slice(1)} Coming Soon</h2>
                        <p>Our AI is currently building this feature for you.</p>
                        <button class="btn-primary" onclick="window.Dream.switchView('dashboard')">Back to Dashboard</button>
                    </div>
                `;
            }

            // Animation In
            viewport.style.opacity = '1';
            viewport.style.transform = 'translateY(0)';
        }, 300);
    }

    setupCompanion() {
        const trigger = document.getElementById('companion-trigger');
        const panel = document.getElementById('companion-panel');
        const closeBtn = document.getElementById('close-companion');

        trigger.addEventListener('click', () => {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                document.getElementById('chat-input').focus();
            }
        });

        closeBtn.addEventListener('click', () => panel.classList.add('hidden'));
    }

    setupInterventions() {
        // Simple logic to simulate intervention
        window.triggerNudge = () => {
            document.getElementById('intervention-overlay').classList.remove('hidden');
        };

        document.getElementById('btn-return-growth').addEventListener('click', () => {
            document.getElementById('intervention-overlay').classList.add('hidden');
            this.switchView('learning-path');
        });

        document.getElementById('btn-ignore-nudge').addEventListener('click', () => {
            document.getElementById('intervention-overlay').classList.add('hidden');
        });
    }

    updateGlobalStats() {
        if (!this.user) return;
        document.getElementById('shell-username').textContent = this.user.name;
        document.getElementById('shell-avatar').textContent = this.user.avatar || '🌱';
        document.getElementById('shell-streak').textContent = this.user.streak || 0;
        document.getElementById('shell-xp').textContent = this.user.xp || 0;
        
        document.querySelectorAll('.user-goal-text').forEach(el => {
            el.textContent = this.user.goal;
        });
    }
}

// Attach to window for accessibility from other modules
window.Dream = new DreamApp();
