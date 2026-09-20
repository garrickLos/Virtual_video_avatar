class SettingsManager {
    constructor() {
        this.storageKey = 'character_settings';
        this.currentSettings = {};
        this.changeListeners = new Set();
    }

    async init(){
        await this.loadSettings();
        window.storeAPI.onChange((newSettings) => {
            this.currentSettings = newSettings;
            for (const listener of this.changeListeners) listener(this.currentSettings);
        });
    }

    async loadSettings() {
        const storedData = await window.storeAPI.get(this.storageKey);
        this.currentSettings = storedData; // is nooit undefined dankzij electron-store defaults
    }

    async saveSettings() {
        await window.storeAPI.set(this.storageKey, this.currentSettings);
    }

    getValue(key) {
        return this.currentSettings[key];
    }

    async setValue(key, value) {
        this.currentSettings[key] = value;
        await this.saveSettings();
    }

    async updateMultiple(newValues) {
        this.currentSettings = { ...this.currentSettings, ...newValues };
        await this.saveSettings();
    }

    subscribe(listener) {
        this.changeListeners.add(listener);
        return () => this.changeListeners.delete(listener);
    }
}

export const settings = new SettingsManager();