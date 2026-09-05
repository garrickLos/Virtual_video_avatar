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

    toggle_el?.addEventListener("change", toggleSettingsVisibility);
    toggle_marker_el?.addEventListener("change", toggleRotateMarker);

    applyMarkerVisibility(settings.getValue("rotation_marker_active"));

    set_pos("setRotationPosY", origin_y, "rotation_marker_posY");
    set_pos("setRotationPosX", origin_x, "rotation_marker_posX");

    settings.subscribe(() => {
        applyMarkerVisibility(settings.getValue("rotation_marker_active"));
    });
}

function toggleSettingsVisibility() {
    settings_el?.classList.toggle("hidden", toggle_el.checked);
}

async function toggleRotateMarker(event) {
    marker_visibility = event.target.checked;
    applyMarkerVisibility(marker_visibility);
    await settings.setValue("rotation_marker_active", marker_visibility);
}

function applyMarkerVisibility(value) {
    marker_visibility = Boolean(value);
    debug_stip?.style.setProperty(
        "--visibility",
        marker_visibility ? "visible" : "hidden"
    );

    const toggle_marker_el = document.getElementById("hideRotationMarker");
    if (toggle_marker_el) toggle_marker_el.checked = marker_visibility;
}

function set_pos(element_id, css_var, settings_key) {
    const pos_input_id = document.getElementById(element_id);

    const applyPos = (original_value) => {
        const percentage_value = original_value * 100;

        document.documentElement.style.setProperty(css_var, percentage_value + "%");
    };

    const updatePosVariable = (original_value) => {
        applyPos(original_value);
        settings.setValue(settings_key, parseFloat(original_value));
    };

    if (pos_input_id) {
        pos_input_id.addEventListener("input", (event) => {
            updatePosVariable(event.target.value);
        });
    }

    const savedValue = settings.getValue(settings_key);
    const initialValue = savedValue ?? pos_input_id?.value ?? 0;
    if (pos_input_id && savedValue !== undefined && savedValue !== null) {
        pos_input_id.value = savedValue;
    }

    applyPos(initialValue);
    settings.subscribe(() => {
        const updatedValue = settings.getValue(settings_key);
        if (updatedValue === undefined || updatedValue === null) return;

        if (pos_input_id) pos_input_id.value = updatedValue;
        applyPos(updatedValue);
    });
}

export { initSpeechSettings };