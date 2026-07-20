import { createEl } from "./index.js";

const settingsWrapper = document.querySelector("#settings");

/**
 * Maakt een inklapbare instellingen-groep aan.
 * @param {string} groupName - naam/titel van de groep
 * @param {...Node} settingElements - de elementen die in de groep komen
 * @returns {HTMLElement} de aangemaakte group
 */
export function createSettingsGroup(groupName, ...settingElements) {
    const header = createEl("div", {
        className: "setting-group-header",
        text: groupName
    });

    const content = createEl("div", {
        className: "setting-group-content"
    }, ...settingElements);

    const group = createEl("div", {
        className: "setting-group closed"
    }, header, content);

    settingsWrapper.appendChild(group);
    return group;
}

// Event delegation: één listener voor alle (ook toekomstige) groepen.
settingsWrapper.addEventListener("click", (event) => {
    const header = event.target.closest(".setting-group-header");
    if (!header) return; // klik was niet op een header, dus negeren

    const group = header.closest(".setting-group");
    group?.classList.toggle("closed");
});