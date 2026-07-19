import { createEl, createSettingsGroup } from "../components/index.js";

export function setBackgroundSettings() {
    const backgroundColor_container = createEl("div", {
        className: "background-container"
    }, createEl("div", {
        className: "input-container"
    },
        createEl("label", {
            for: "greenscreen-color-input",
            text: "Greenscreen color"
        }),

        createEl("input", {
            type: "color",
            id: "greenscreen-color-input",
            className: "color-input",
            placeholder: "#00ff00"
        })
    ))
    
    const inputContainer = createEl("div", {
        className: "input_container"
    }, backgroundColor_container);

    createSettingsGroup("background settings", inputContainer);
}