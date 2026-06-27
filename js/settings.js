/* dream/js/settings.js */
import { StorageService } from './services/storageService.js';

export const Settings = {
    render(user) {
        return `
            <div class="settings-container animate-fade-in">
                <header class="settings-header">
                    <h1>Settings</h1>
                    <p>Manage your growth profile and AI preferences.</p>
                </header>

                <div class="settings-grid">
                    <!-- Profile Section -->
                    <section class="settings-card glass">
                        <h3>Identity & Goal</h3>
                        <div class="form-group">
                            <label>Display Name</label>
                            <input type="text" id="settings-name" value="${user.name}">
                        </div>
                        <div class="form-group">
                            <label>Primary Goal</label>
                            <input type="text" id="settings-goal" value="${user.goal}">
                        </div>
                        <div class="form-group">
                            <label>Your "Why"</label>
                            <textarea id="settings-reason">${user.reason}</textarea>
                        </div>
                    </section>

                    <!-- AI Personality Section -->
                    <section class="settings-card glass">
                        <h3>Dream Coach Personality</h3>
                        <p class="setting-desc">How should the AI communicate with you?</p>
                        <select id="settings-ai-personality">
                            <option value="supportive" ${user.aiPersonality === 'supportive' ? 'selected' : ''}>Supportive & Encouraging</option>
                            <option value="mentor" ${user.aiPersonality === 'mentor' ? 'selected' : ''}>Wise Mentor</option>
                            <option value="direct" ${user.aiPersonality === 'direct' ? 'selected' : ''}>Direct & Efficient</option>
                            <option value="strict" ${user.aiPersonality === 'strict' ? 'selected' : ''}>Strict Accountability</option>
                        </select>
                    </section>

                    <!-- Intervention Section -->
                    <section class="settings-card glass">
                        <h3>Intervention Mode</h3>
                        <p class="setting-desc">Level of friction when distractions are detected.</p>
                        <div class="mode-options">
                            <label class="mode-radio">
                                <input type="radio" name="int-mode" value="gentle" ${user.interventionMode === 'gentle' ? 'checked' : ''}>
                                <span>Gentle Nudge</span>
                            </label>
                            <label class="mode-radio">
                                <input type="radio" name="int-mode" value="reflective" ${user.interventionMode === 'reflective' ? 'checked' : ''}>
                                <span>Reflective Questions</span>
                            </label>
                            <label class="mode-radio">
                                <input type="radio" name="int-mode" value="guardian" ${user.interventionMode === 'guardian' ? 'checked' : ''}>
                                <span>Guardian (Strict)</span>
                            </label>
                        </div>
                    </section>

                    <!-- Danger Zone -->
                    <section class="settings-card glass danger-zone">
                        <h3>Data & Progress</h3>
                        <p class="setting-desc">Once deleted, your Dream Tree and progress cannot be recovered.</p>
                        <div class="danger-actions">
                            <button id="export-data" class="btn-secondary">Export Data (JSON)</button>
                            <button id="reset-progress" class="btn-text danger">Reset All Progress</button>
                        </div>
                    </section>
                </div>

                <div class="settings-footer">
                    <button id="save-settings" class="btn-primary">Save Changes</button>
                </div>
            </div>
        `;
    },

    init(user) {
        document.getElementById('save-settings').addEventListener('click', () => {
            this.save(user);
        });

        document.getElementById('reset-progress').addEventListener('click', () => {
            if(confirm("Are you sure? This will delete your tree and XP.")) {
                StorageService.clearAll();
                window.location.href = 'index.html';
            }
        });

        document.getElementById('export-data').addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "dream_profile.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    },

    save(user) {
        user.name = document.getElementById('settings-name').value;
        user.goal = document.getElementById('settings-goal').value;
        user.reason = document.getElementById('settings-reason').value;
        user.aiPersonality = document.getElementById('settings-ai-personality').value;
        user.interventionMode = document.querySelector('input[name="int-mode"]:checked').value;

        StorageService.save('user_profile', user);
        alert("Settings saved successfully!");
        window.Dream.updateGlobalUI();
    }
};
