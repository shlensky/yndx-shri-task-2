const {getMod, isBlock, isElem} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isElem(node, "form", "label")) {
        context.insideLabel = true;
    }

    if (
        isBlock(node, "input") ||
        isBlock(node, "button") ||
        (isBlock(node, "text") && context.insideLabel)
    ) {

        if (!context.formInfo.size) {
            context.formInfo.size = getMod(node, "size");
        } else if (getMod(node, "size") !== context.formInfo.size) {
            errors.push({
                code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
                error: "Все инпуты, кнопки и тексты в лейблах в блоке формы должны быть одного размера."
            });
        }
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = {checkRuleDown, checkRuleUp};
