/* dream/js/storage.js */

export const StorageService = {
    prefix: 'dream_app_',

    save(key, val) {
        localStorage.setItem(this.prefix + key, JSON.stringify(val));
    },

    load(key) {
        const item = localStorage.getItem(this.prefix + key);
        if (!item) return null;
        try {
            return JSON.parse(item);
        } catch (e) {
            return item;
        }
    },

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    },

    clearAll() {
        // Only clear Dream-related keys
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
};
