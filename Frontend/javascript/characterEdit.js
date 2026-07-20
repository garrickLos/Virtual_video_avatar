import { mic_input } from "./micInput.js";
import { settings } from "./edit_settings.js";

export function Talking(state) {
    const character_head_el = document.getElementById("rotating");
    const min_rotate = -40
    const max_rotate = -min_rotate

    const huidige_rotatie_css = "--huidige-rotatie"

    character_head_el.style.setProperty("--min-rotate-deg", `${min_rotate}deg`);
    character_head_el.style.setProperty("--max-rotate-deg", `${max_rotate}deg`);
    character_head_el.style.setProperty("--transition_style", `ease-in-out`);

    if (state.isTalking) {
        mic_input(character_head_el, huidige_rotatie_css, state);
    }

    character_head_el.style.setProperty(huidige_rotatie_css, `0deg`);
}

export function initCharacterPicture() {
    // Input fields
    const headInput = document.getElementById("head-picture-input");
    const bodyInput = document.getElementById("body-picture-input");

    // elements
    const head_el = document.getElementById("character_head");
    const body_el = document.getElementById("character_body");

    function setCharacter() {
        const savedHead = settings.getValue("head_picture");
        const savedBody = settings.getValue("body_picture");

        head_el.src = savedHead;
        body_el.src = savedBody;
    }

    // setCharacter();

    const extractFileName = (fullPath) => {
        // 1. Haal de map-paden weg (werkt voor zowel Windows \ als Mac /)
        const fileNameWithExt = fullPath.replace(/^.*[\\\/]/, '');
        // 2. Verwijder .png of .PNG aan het einde en return het resultaat
        return fileNameWithExt
    };

    const removeQuotes = (str) => {
        // haalt alleen " weg aan begin en eind van de string
        return str.replace(/^"(.*)"$/, '$1');
    };

    const setupPathInput = (inputElement, settingKey, imageElement) => {
        if (!inputElement) return;

        // --- STAP 1: OPSTARTEN (Lezen) ---
        const opgeslagenWaarde = settings.getValue(settingKey);
        if (opgeslagenWaarde) {
            // Laat de huidige naam zien met .png erbij
            inputElement.value = opgeslagenWaarde;
            // Update het plaatje op het scherm
            
            if (imageElement) imageElement.src = opgeslagenWaarde;
            // `./character_art/Characters/${opgeslagenWaarde}`;
        }

        // --- STAP 2: AANPASSEN (Schrijven) ---
        // 'change' vuurt af als de gebruiker een tekst plakt en op Enter klikt (of wegklikt)
        inputElement.addEventListener("change", async (event) => {
            const rawInput = event.target.value;
            if (!rawInput.trim()) return;

            // Roep de snij-functie aan (bijv: "C:\images\sentra.png" -> "sentra")
            const bestandsNaam = removeQuotes(rawInput);

            // Sla de opgeschoonde naam op in je instellingen
            await settings.setValue(settingKey, bestandsNaam);

            // Update direct de afbeelding op het scherm
            if (imageElement) {
                imageElement.src = bestandsNaam;
                // `./character_art/Characters/${bestandsNaam}`;
            }

            // Maak het invulveld 'schoon' zodat alleen de bestandsnaam blijft staan in de app
            inputElement.value = bestandsNaam;
        });
    }

    setupPathInput(headInput, "head_picture", head_el);
    setupPathInput(bodyInput, "body_picture", body_el);
}

export function initCharacterScale(inputId = 'character-scale-input') {
    const scaleInput = document.getElementById(inputId);

    if (!scaleInput) {
        console.warn(`Element met ID '${inputId}' is niet gevonden.`);
        return;
    }

    // Functie om de CSS variabele te updaten op de :root (html element)
    const updateScaleVariable = (value) => {
        document.documentElement.style.setProperty('--character_scale', value);
    };

    // Luister naar elke update in het invoerveld (real-time)
    scaleInput.addEventListener('input', (event) => {
        updateScaleVariable(event.target.value);
    });

    // Initialiseer de CSS variabele direct met de beginwaarde van de input
    updateScaleVariable(scaleInput.value);
}