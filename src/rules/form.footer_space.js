const { isBlock, isElem, getMixMod, getLocation, getRelativeSize } = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "form")) {
        context.formInfo.footerNodes = [];
    }

    if (isElem(node, "form", "footer")) {
        context.formInfo.footerNodes.push(node);
    }
}

function checkRuleUp(node, errors, context) {
    if (isBlock(node, "form") && context.formInfo.footerNodes && context.formInfo.size) {
        context.formInfo.footerNodes.forEach(footerNode => {
            const spaceV = getMixMod(footerNode, "form", "item", "space-v");
            if (spaceV !== context.formInfo.size) {
                errors.push({
                    code: "FORM.FOOTER_VERTICAL_SPACE_IS_INVALID",
                    error: "Вертикальный внутренний отступ подвала формы должен быть равным эталонному размеру.",
                    location: getLocation(footerNode)
                });
            }

            const spaceH = getMixMod(footerNode, "form", "item", "space-h");
            if (spaceH !== getRelativeSize(context.formInfo.size, 1)) {
                errors.push({
                    code: "FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID",
                    error: "Горизонтальный внутренний отступ подвала формы должен быть на 1 шаг больше эталонного размера.",
                    location: getLocation(footerNode)
                });
            }
        })
    }
}

module.exports = {checkRuleDown, checkRuleUp};
