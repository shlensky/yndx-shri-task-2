const { getRelativeSize, getMod, isBlock, isElem, getLocation } = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "form")) {
        context.formInfo.headerTextNodes = [];
    }

    if (isElem(node, "form", "header")) {
        context.insideHeader = true;
    }

    if (isBlock(node,"text") && context.insideHeader) {
        context.formInfo.headerTextNodes.push(node);
    }
}

function checkRuleUp(node, errors, context) {
    if (isBlock(node, "form") && context.formInfo.headerTextNodes) {
        return context.formInfo.headerTextNodes.map((textNode) => {
            if (getMod(textNode, "size") !== getRelativeSize(context.formInfo.size, 2)) {
                errors.push({
                    code: "FORM.HEADER_TEXT_SIZE_IS_INVALID",
                    error: "Все текстовые блоки внутри заголовка формы должны быть на 2 шага больше эталонного размера.",
                    location: getLocation(textNode)
                });
            }
        });
    }
}

module.exports = {checkRuleDown, checkRuleUp};
