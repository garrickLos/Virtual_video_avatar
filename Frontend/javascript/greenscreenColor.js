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


    // --- STAP 2: GEBRUIKERSINTERACTIE (Schrijven) ---
    // Functie die we ALLEEN aanroepen als de gebruiker een nieuwe kleur kiest
    const updateGreenscreenColor = async (hexValue) => {
        // Update direct het scherm
        document.documentElement.style.setProperty('--greenscreen_color', hexValue);
        
        // Sla de nieuwe waarde op in het bestand
        await settings.setValue("background_color", hexValue);
    };

    // Luister of de gebruiker de kleur aanpast
    colorInput.addEventListener('input', (event) => {
        updateGreenscreenColor(event.target.value);
    });
}