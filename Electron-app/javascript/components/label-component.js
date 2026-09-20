import { createEl } from "./index.js";

/**
 * Genereert een container met daarin één of meerdere label + input paren.
 *
 * @param {string} container_classname - classname van de buitenste container
 * @param {string} input_classname - classname van de binnenste wrapper (bv. "input-container")
 * @param {Array<{label: object, input: object}>} fields - lijst van veld-definities.
 *        Elk veld heeft:
 *          - label: object met attributen voor createEl("label", ...), bv. { for, text }
 *          - input: object met attributen voor createEl("input", ...), bv. { type, id, className, min, max, step, value, placeholder }
 *        Omdat "input" hier 1-op-1 doorgegeven wordt aan createEl, kun je hier
 *        ELK attribuut in kwijt zonder label_component zelf aan te passen.
 *
 * @returns {HTMLElement} de opgebouwde container
 */
export function label_component(container_classname, input_classname, fields = []) {

    const inner_container = createEl("div", {
        className: input_classname
    });

    fields.forEach((field) => {
        const label = createEl("label", {
            for: field.label.for,
            text: field.label.text
        });

        // spread zorgt dat elk attribuut dat je meegeeft (type, min, max,
        // step, value, placeholder, id, className, ...) automatisch
        // doorgegeven wordt, zonder dat je ze hier los hoeft te benoemen.
        const input = createEl("input", {
            ...field.input
        });

        inner_container.appendChild(label);
        inner_container.appendChild(input);
    });

    const container = createEl("div", {
        className: container_classname
    }, inner_container);

    return container;
}