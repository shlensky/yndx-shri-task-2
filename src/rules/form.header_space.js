const { isBlock, isElem, getMixMod, getLocation, getRelativeSize } = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "form")) {
        context.formInfo.headerNodes = [];
    }

    if (isElem(node, "form", "header")) {
        context.formInfo.headerNodes.push(node);
    }
}

function checkRuleUp(node, errors, context) {
    if (isBlock(node, "form") && context.formInfo.headerNodes) {
        context.formInfo.headerNodes.forEach(headerNode => {
            const spaceV = getMixMod(headerNode, "form", "item", "space-v");
            if (spaceV !== context.formInfo.size) {
                errors.push({
                    code: "FORM.HEADER_VERTICAL_SPACE_IS_INVALID",
                    error: "Вертикальный внутренний отступ заголовка формы должен быть равным эталонному размеру.",
                    location: getLocation(headerNode)
                });
            }

            const spaceH = getMixMod(headerNode, "form", "item", "space-h");
            if (spaceH !== getRelativeSize(context.formInfo.size, 1)) {
                errors.push({
                    code: "FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID",
                    error: "Горизонтальный внутренний отступ заголовка формы должен быть на 1 шаг больше эталонного размера.",
                    location: getLocation(headerNode)
                });
            }
        })
    }
}

module.exports = {checkRuleDown, checkRuleUp};
