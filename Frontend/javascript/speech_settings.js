import { settings } from "./edit_settings.js";

const origin_x = "--origin_x";
const origin_y = "--origin_y"

const toggle_el = document.getElementById("hideSettingsToggle");
const debug_stip = document.getElementById("debug-stip");
const settings_el = document.getElementById("settings");

let marker_visibility = false;

// speech_settings.js
function initSpeechSettings() {
    const toggle_marker_el = document.getElementById("hideRotationMarker");

    toggle_el.addEventListener("change", toggleSettingsVisibility);
    toggle_marker_el.addEventListener("change", toggleRotateMarker);

    set_pos("setRotationPosY", origin_y, "rotation_marker_posY");
    set_pos("setRotationPosX", origin_x, "rotation_marker_posX");
}

function toggleSettingsVisibility() {
    settings_el.classList.toggle("hidden", toggle_el.checked);
}

function toggleRotateMarker() {

    marker_visibility = !marker_visibility;
    debug_stip.style.setProperty(
        "--visibility",
        marker_visibility ? "visible" : "hidden"
    );
}

function set_pos(element_id, css_var, settings_key) {
    const pos_input_id = document.getElementById(element_id);

    if (!pos_input_id) {
        console.warn(`Element met ID '${element_id}' is niet gevonden.`);
        return;
    }

    const updatePosVariable = (original_value) => {
        const percentage_value = original_value * 100;

        document.documentElement.style.setProperty(css_var, percentage_value + "%");

        if (settings_key) {
            settings.setValue(settings_key, original_value);
        }
    };

    pos_input_id.addEventListener("input", (event) => {
        updatePosVariable(event.target.value);
    });

    // Opgeslagen waarde ophalen (indien aanwezig) en toepassen op het element
    let initial_value = pos_input_id.value;

    if (settings_key) {
        const saved_value = settings.getValue(settings_key);
        if (saved_value !== undefined && saved_value !== null) {
            initial_value = saved_value;
            pos_input_id.value = saved_value;
        }
    }

    updatePosVariable(initial_value);
}

export { initSpeechSettings };