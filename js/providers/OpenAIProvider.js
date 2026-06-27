/* dream/js/providers/OpenAIProvider.js */

export class OpenAIProvider {
    constructor(config = {}) {
        this.apiKey = config.apiKey || null;
        this.model = config.model || 'gpt-4';
    }

    /**
     * Mock text generation for the architecture.
     */
    async generateText(prompt) {
        console.log("OpenAI Provider: Requesting completion for prompt.");
        // Returns null to trigger the Fallback systems in AIService
        return null; 
    }

    /**
     * Mock JSON generation.
     */
    async generateJSON(prompt, schema) {
        return null;
    }
}
