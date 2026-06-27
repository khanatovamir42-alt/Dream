/* dream/js/learningPath.js */
import { DreamPathGenerator } from './services/dreamPathGenerator.js';

export const LearningPath = {
    render(user) {
        const nodes = DreamPathGenerator.generateInitialPath(user);
        
        // Generate the HTML for the path nodes
        const nodesHTML = nodes.map((node, index) => {
            // Calculate an alternating offset for the "Duolingo" curve effect
            const offset = Math.sin(index * 1.5) * 80; 
            
            return `
                <div class="path-node-wrapper" style="transform: translateX(${offset}px)">
                    <div class="path-node ${node.status}" 
                         data-id="${node.id}" 
                         title="${node.title}">
                        <div class="node-inner">
                            <span class="node-icon">${DreamPathGenerator.getNodeIcon(node.type)}</span>
                        </div>
                        <div class="node-label">
                            <span class="node-type-tag">${node.type}</span>
                            <h4>${node.title}</h4>
                        </div>
                        ${node.status === 'active' ? '<div class="active-indicator"></div>' : ''}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="path-container">
                <header class="path-header">
                    <h1>Your Journey to ${user.goal}</h1>
                    <p>Follow the path, complete lessons, and grow your tree.</p>
                </header>
                
                <div class="path-scroll-area">
                    <div class="path-line-svg-container">
                        <!-- Future: Dynamic SVG path connecting nodes -->
                    </div>
                    <div class="path-nodes-list">
                        ${nodesHTML}
                    </div>
                </div>
            </div>
        `;
    },

    init(user) {
        console.log("Learning Path View Initialized");
        
        // Add click listeners to nodes
        document.querySelectorAll('.path-node').forEach(node => {
            node.addEventListener('click', () => {
                const id = node.getAttribute('data-id');
                const status = node.classList.contains('locked') ? 'locked' : 'available';
                
                if (status === 'available' || node.classList.contains('active')) {
                    // Navigate to Lesson View
                    window.Dream.switchView('lesson-view', { lessonId: id });
                } else {
                    alert("This node is locked. Complete the previous lessons to unlock.");
                }
            });
        });
    }
};
