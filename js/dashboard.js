/* dream/js/dashboard.js */

export const Dashboard = {
    /**
     * Renders the HTML structure for the Dashboard view.
     * @param {UserProfile} user - The current user object.
     */
    render(user) {
        return `
            <div class="dashboard-grid">
                <!-- Welcome Section -->
                <section class="welcome-section">
                    <div class="welcome-text">
                        <h1>Good morning, ${user.name.split(' ')[0]} 👋</h1>
                        <p>You're on a <strong>${user.streak}-day streak</strong>. Keep the momentum going!</p>
                    </div>
                    <div class="current-goal-card glass">
                        <div class="goal-icon">🎯</div>
                        <div class="goal-info">
                            <span class="label">Primary Goal</span>
                            <h3>${user.goal}</h3>
                            <div class="progress-bar-container">
                                <div class="progress-fill" style="width: ${user.xp % 100}%"></div>
                            </div>
                            <span class="progress-text">${user.xp % 100}% toward next milestone</span>
                        </div>
                    </div>
                </section>

                <!-- Dream Tree Column -->
                <section class="tree-widget glass animate-fade-in">
                    <div class="widget-header">
                        <h3>Your Dream Tree</h3>
                        <span class="badge">${user.treeStage.charAt(0).toUpperCase() + user.treeStage.slice(1)}</span>
                    </div>
                    <div class="tree-display" id="dashboard-tree-container">
                        <!-- Tree SVG or Animation will be rendered here -->
                        <div class="tree-visual stage-${user.treeStage}">
                            ${this.getTreeSVG(user.treeStage)}
                        </div>
                    </div>
                    <div class="tree-footer">
                        <p>"Every lesson makes your forest thicker."</p>
                    </div>
                </section>

                <!-- Today's Lesson Widget -->
                <section class="lesson-widget glass">
                    <div class="widget-header">
                        <h3>Today's Focus</h3>
                    </div>
                    <div class="lesson-card">
                        <div class="lesson-meta">Lesson 4 of 20</div>
                        <h4>Foundations of ${user.goal.split(' ')[0]}</h4>
                        <p>Deep dive into core principles and practical applications.</p>
                        <button class="btn-primary" onclick="window.Dream.switchView('learning-path')">Start Lesson (12 min)</button>
                    </div>
                </section>

                <!-- Stats Grid -->
                <section class="stats-subgrid">
                    <div class="stat-card glass">
                        <span class="stat-label">Total XP</span>
                        <span class="stat-value">${user.xp}</span>
                    </div>
                    <div class="stat-card glass">
                        <span class="stat-label">Lessons Done</span>
                        <span class="stat-value">${user.completedLessons?.length || 0}</span>
                    </div>
                    <div class="stat-card glass">
                        <span class="stat-label">Skills Unlocked</span>
                        <span class="stat-value">${Object.keys(user.skills || {}).length || 0}</span>
                    </div>
                </section>

                <!-- AI Coach Recommendations -->
                <section class="coach-insights glass">
                    <div class="widget-header">
                        <h3>Coach Insights</h3>
                        <span class="ai-badge">AI</span>
                    </div>
                    <div class="insight-item">
                        <span class="icon">💡</span>
                        <p>You're strongest in <strong>Basics</strong>. Try a <strong>Practice Challenge</strong> today to push your boundaries.</p>
                    </div>
                    <div class="insight-item">
                        <span class="icon">📈</span>
                        <p>Consistency is up 20% this week. Your tree is about to sprout!</p>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Initializes any interactive logic for the dashboard (e.g. charts).
     */
    init(user) {
        console.log("Dashboard view initialized.");
        // Future: Initialize Chart.js here for progress heatmaps
    },

    /**
     * Returns a simple SVG based on the growth stage.
     */
    getTreeSVG(stage) {
        // Placeholder simple icons for stages. Later these will be complex animated SVGs.
        const icons = {
            'seed': '🌱',
            'sprout': '🌿',
            'small': '🌳',
            'growing': '🌲',
            'large': '🌳🌲',
            'forest': '🌲🌳🌲'
        };
        return `<div class="tree-icon-large">${icons[stage] || '🌱'}</div>`;
    }
};
