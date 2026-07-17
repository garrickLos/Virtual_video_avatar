import { settings } from "./edit_settings.js";

export function initGreenscreenColor(inputId = 'greenscreen-color-input') {
    const colorInput = document.getElementById(inputId);

    if (!colorInput) {
        console.warn(`Element met ID '${inputId}' is niet gevonden.`);
        return;
    }

    // --- STAP 1: OPHALEN EN INSTELLEN (Lezen) ---
    // Haal de opgeslagen kleur (of default) op uit de database
    const opgeslagenKleur = settings.getValue("background_color");
    
    // Pas de CSS variabele direct aan
    document.documentElement.style.setProperty('--greenscreen_color', opgeslagenKleur);
    
    // Zorg dat de colorpicker in de HTML ook deze kleur laat zien
    colorInput.value = opgeslagenKleur;


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