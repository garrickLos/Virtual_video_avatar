import { createEl, createSettingsGroup, label_component } from "../components/index.js";

export function setBackgroundSettings() {
    const backgroundColor_container = greenscreen_container();

    const inputContainer = createEl("div", {
        className: "input_container"
    }, backgroundColor_container);

    createSettingsGroup("background settings", inputContainer);
}

function greenscreen_container() {
    const greenscreen_container = label_component(
        "background-container", "input-container",
        [
            {
                label: {
                    for: "greenscreen-color-input",
                    text: "Greenscreen color"
                },
                input: {
                    type: "color",
                    id: "greenscreen-color-input",
                    className: "color-input"
                }
            }
        ]
    )

    return greenscreen_container;
}