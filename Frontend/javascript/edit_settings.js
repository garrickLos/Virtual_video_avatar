class SettingsManager {
    constructor() {
        this.storageKey = 'character_settings';
        this.defaultSettings = { 
            "head_picture": "sentra", 
            "body_picture": "../character_art/Characters/dnd_vulivant_body.png",
            "background_color": "#ff6600"
        };
        this.currentSettings = {};
    }

    async init(){
        await this.loadSettings();
    }

    // async toegevoegd!
    async loadSettings() {
        // Let op: controleer of je in je preload.js 'storeAPI' of 'storeApi' hebt getypt. 
        // Ik ga hier uit van storeAPI.
        const storedData = await window.storeAPI.get(this.storageKey);
        
        if (storedData) {
            this.currentSettings = storedData;
        } else {
            this.currentSettings = { ...this.defaultSettings };
            await this.saveSettings(); // Ook opslaan moet je even op wachten (await)
        }
    }

    // Nu opgeslagen in je electron-store in plaats van localStorage
    async saveSettings() {
        await window.storeAPI.set(this.storageKey, this.currentSettings);
    }

    getValue(key) {
        return this.currentSettings[key];
    }

    // async toegevoegd om de storeAPI te kunnen gebruiken
    async setValue(key, value) {
        this.currentSettings[key] = value;
        await this.saveSettings();
        console.log(`Waarde van '${key}' is nu:`, value);
    }

    // async toegevoegd
    async updateMultiple(newValues) {
        this.currentSettings = { ...this.currentSettings, ...newValues };
        await this.saveSettings();
    }
}

export const settings = new SettingsManager();