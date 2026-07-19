import {settings} from "./edit_settings.js";

import { Talking, initCharacterPicture, initCharacterScale } from "./characterEdit.js";
import { initGreenscreenColor } from './greenscreenColor.js';

import { groupAllSettings } from "./grouped_settings/index.js";

const button_el = document.getElementById("spinButton");
const settings_el = document.getElementById("settings");
const toggle_el = document.getElementById("hideSettingsToggle");

const rotateMarker_el = document.getElementById("debug-stip");
const toggle_marker_el = document.getElementById("hideRotationMarker");
let marker_visibility = false;

const state = { isTalking: false };

export function Start() {
    state.isTalking = !state.isTalking;
    console.log(state.isTalking ? "Talking" : "Shutting up!");

    Talking(state);
}

function toggleSettingsVisibility() {
    settings_el.classList.toggle("hidden", toggle_el.checked);
}

function toggleRotateMarker() {

    if (!marker_visibility) {
        marker_visibility = true;
        rotateMarker_el.style.setProperty("--visibility", "visible");
    } else {
        marker_visibility = false;
        rotateMarker_el.style.setProperty("--visibility", "hidden");
    }
}

button_el.addEventListener("click", Start);
toggle_el.addEventListener("change", toggleSettingsVisibility);
toggle_marker_el.addEventListener("change", toggleRotateMarker);


document.addEventListener('DOMContentLoaded', async () => {
    await settings.init();

    initCharacterScale();
    initCharacterPicture();
    
    initGreenscreenColor();
});

groupAllSettings();