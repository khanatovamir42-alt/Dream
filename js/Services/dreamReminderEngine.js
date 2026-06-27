/* dream/js/services/dreamReminderEngine.js */

export const DreamReminderEngine = {
    /**
     * Analyzes current behavior and returns a reminder message.
     */
    getIntervention(user) {
        const mode = user.interventionMode || 'reflective';
        
        const placeholders = {
            'gentle': `You're doing great with ${user.goal}. Ready for a quick 5-minute session?`,
            'reflective': `You told me that ${user.reason} is why you want to learn this. Does scrolling help you get there?`,
            'guardian': `Goal Alert: Your ${user.streak}-day streak for ${user.goal} is at risk. Step away from the distraction.`
        };

        return placeholders[mode] || placeholders['reflective'];
    },

    /**
     * Future: Tracks when the user ignored a nudge to adjust "Strictness".
     */
    logInterventionResult(success) {
        console.log("Dream Coach: Intervention success =", success);
    }
};
