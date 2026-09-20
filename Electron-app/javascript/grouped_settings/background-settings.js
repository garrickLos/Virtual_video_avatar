import {settings} from "../edit_settings.js";
import { createEl, createSettingsGroup, label_component } from "../components/index.js";

export function setBackgroundSettings() {
    const backgroundColor_container = greenscreen_container();
    const defaultColors = defaultColors_container();

    const inputContainer = createEl("div", {
        className: "input_container"
    }, backgroundColor_container);

    createSettingsGroup("background settings", inputContainer, defaultColors);
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

function defaultColors_container() {
    const default_colors = [];

    const jsonDefaultColors = settings.getValue("background_color_shortcuts");

    console.log(jsonDefaultColors);

    for (let i = 0; i < jsonDefaultColors.length; i++) {
        const color = jsonDefaultColors[i].color;
        const button = createEl("button", {
            id: `defaultColor-input${i}`,
            style: `background-color: ${color};`
        });

        button.addEventListener("click", async () => {
            await settings.setValue("background_color", color);
            document.documentElement.style.setProperty("--greenscreen_color", color);

            const colorInput = document.getElementById("greenscreen-color-input");
            if (colorInput) colorInput.value = color;
        });

        default_colors.push(createEl("div",
            {
                className: "defaultColors-input"
            },
            button
        ))
    }

    const defaultColors_container = createEl("div",
        {
            className: "defaultColor-container",
            id: "test"
        }, createEl("label", 
            {
                text: "Default color picks"
            }
        ), createEl("div", {id: "defaultColorPicks-div"}, default_colors)
    );

    return defaultColors_container;
}