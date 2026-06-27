/* dream/js/services/dreamPathGenerator.js */

export const DreamPathGenerator = {
    /**
     * Generates a roadmap based on user profile.
     * @param {Object} user - UserProfile instance.
     * @returns {Array} List of path nodes.
     */
    generateInitialPath(user) {
        // TODO: Later, this will call the DreamAIService to get a personalized JSON.
        // For now, we return a high-quality static structure based on their goal.
        
        return [
            { id: 'n1', type: 'foundation', title: 'The Starting Seed', status: 'completed', xp: 50 },
            { id: 'n2', type: 'lesson', title: 'Core Principles', status: 'active', xp: 100 },
            { id: 'n3', type: 'lesson', title: 'Deep Dive: Mechanics', status: 'locked', xp: 100 },
            { id: 'n4', type: 'quiz', title: 'Knowledge Check', status: 'locked', xp: 150 },
            { id: 'n5', type: 'practice', title: 'First Challenge', status: 'locked', xp: 200 },
            { id: 'n6', type: 'milestone', title: 'The First Sprout', status: 'locked', xp: 500 },
            { id: 'n7', type: 'lesson', title: 'Advanced Theory', status: 'locked', xp: 150 },
            { id: 'n8', type: 'boss', title: 'The Mastery Exam', status: 'locked', xp: 1000 }
        ];
    },

    getNodeIcon(type) {
        const icons = {
            'foundation': '🌱',
            'lesson': '📚',
            'quiz': '📝',
            'practice': '🛠️',
            'milestone': '🌿',
            'boss': '👑'
        };
        return icons[type] || '📍';
    }
};
