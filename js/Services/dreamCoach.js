/* dream/js/services/dreamCoach.js */

export const DreamCoach = {
    /**
     * Generates a greeting based on the time of day and progress.
     */
    getGreeting(user) {
        const hours = new Date().getHours();
        const timeOfDay = hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";
        return `Good ${timeOfDay}, ${user.name.split(' ')[0]}. You've grown your tree by 5% today. Ready to reach 10%?`;
    },

    /**
     * Future: AI logic to analyze if the user is feeling frustrated.
     */
    analyzeSentiment(input) {
        // Placeholder for future NLP integration
        return "neutral";
    }
};
