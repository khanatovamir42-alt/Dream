/* dream/js/services/apiManager.js */
import { OpenAIProvider } from '../providers/OpenAIProvider.js';

export const APIManager = {
    provider: null,

    init(config = {}) {
        // Default to OpenAI for architecture, but can be switched to Gemini, etc.
        this.provider = new OpenAIProvider(config);
    },

    async request(method, ...args) {
        if (!this.provider || !this.provider.apiKey) {
            console.warn("DreamAI: No API Key configured. Fallback mode active.");
            return null;
        }

        try {
            return await this.provider[method](...args);
        } catch (error) {
            console.error("DreamAI: API request failed", error);
            return null;
        }
    }
};
