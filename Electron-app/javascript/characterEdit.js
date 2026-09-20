import { mic_input } from "./micInput.js";
import { settings } from "./edit_settings.js";

export function Talking(state) {
    const talkingButton = document.querySelector(".talking_button");
    const character_head_el = document.getElementById("rotating");
    const min_rotate = -40
    const max_rotate = -min_rotate

    const huidige_rotatie_css = "--huidige-rotatie"

    character_head_el.style.setProperty("--min-rotate-deg", `${min_rotate}deg`);
    character_head_el.style.setProperty("--max-rotate-deg", `${max_rotate}deg`);
    character_head_el.style.setProperty("--transition_style", `ease-in-out`);

    talkingButton.classList.toggle("listening");

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

        if (head_el && savedHead) head_el.src = savedHead;
        if (body_el && savedBody) body_el.src = savedBody;

        if (headInput && savedHead) headInput.value = savedHead;
        if (bodyInput && savedBody) bodyInput.value = savedBody;
    }

    setCharacter();
    settings.subscribe(setCharacter);

    const extractFileName = (fullPath) => {
        const fileNameWithExt = fullPath.replace(/^.*[\\\/]/, '');
        return fileNameWithExt
    };

    const removeQuotes = (str) => {
        // haalt alleen " weg aan begin en eind van de string
        return str.replace(/^"(.*)"$/, '$1');
    };

    const setupPathInput = (inputElement, settingKey, imageElement) => {
        if (!inputElement) return;

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

export function initCharacterScale(inputId = 'character_scale_input') {
    const scaleInput = document.getElementById(inputId);

    const applyScale = (value) => {
        if (value === undefined || value === null) return;

        document.documentElement.style.setProperty(
            '--character_scale',
            value
        );

        if (scaleInput) {
            scaleInput.value = value;
        }
    };

    const setScale = () => {
        if (scaleInput) {
            scaleInput.addEventListener('input', async (event) => {
                const value = parseFloat(event.target.value);

                if (Number.isNaN(value)) return;

                applyScale(value);
                await settings.setValue(inputId, value);
            });
        }
    }

    applyScale(settings.getValue(inputId));
    setScale(settings.getValue(inputId));

    const unsubscribe = settings.subscribe(() => {
        applyScale(settings.getValue(inputId));
    });

    return unsubscribe;
}