const {getMod, isBlock, isElem, getLocation} = require("../helpers");

function checkRuleDown(node, errors, context) {
    // Create contextual form information structure
    if (isBlock(node, "form")) {
        context.formInfo = {
            size: null,
            sizeMismatch: false
        };
    }

    // Set flag if label occurred
    if (isElem(node, "form", "label")) {
        context.insideLabel = true;
    }

    // Check size (or store if it the first form element)
    if (
        isBlock(node, "input") ||
        isBlock(node, "button") ||
        (isBlock(node, "text") && context.insideLabel)
    ) {
        const blockName = isBlock(node, "input") ? "input" :
            isBlock(node, "button") ? "button" : "text";

        const size = getMod(node, blockName, null, "size");
        if (!context.formInfo.size) {
            if (size) {
                context.formInfo.size = size;
            } else {
                context.formInfo.sizeMismatch = true;
            }
        } else if (size !== context.formInfo.size) {
            context.formInfo.sizeMismatch = true;
        }
    }
}

function checkRuleUp(node, errors, context) {
    if (isBlock(node, "form")) {
        if (context.formInfo.sizeMismatch) {
            errors.push({
                code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
                error: "Все инпуты, кнопки и тексты в лейблах в блоке формы должны быть одного размера (и этот размер должен быть определен).",
                location: getLocation(node)
            });
        }
    }
}

module.exports = {checkRuleDown, checkRuleUp};
