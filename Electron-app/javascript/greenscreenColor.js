import { settings } from "./edit_settings.js";

export function initGreenscreenColor(inputId = 'greenscreen-color-input') {
    const colorInput = document.getElementById(inputId);

    const applyGreenscreenColor = () => {
        const opgeslagenKleur = settings.getValue("background_color");
        if (!opgeslagenKleur) return;

        document.documentElement.style.setProperty('--greenscreen_color', opgeslagenKleur);
        if (colorInput) colorInput.value = opgeslagenKleur;
    };

    applyGreenscreenColor();
    settings.subscribe(applyGreenscreenColor);

    if (!colorInput) return;

    const updateGreenscreenColor = async (hexValue) => {
        document.documentElement.style.setProperty('--greenscreen_color', hexValue);
        
        await settings.setValue("background_color", hexValue);
    };

    colorInput.addEventListener('input', (event) => {
        updateGreenscreenColor(event.target.value);
    });
}