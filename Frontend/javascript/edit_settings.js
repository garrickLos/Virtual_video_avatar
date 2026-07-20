class SettingsManager {
    constructor() {
        this.storageKey = 'character_settings';
        this.currentSettings = {};
    }

    async init(){
        await this.loadSettings();
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
}

export const settings = new SettingsManager();