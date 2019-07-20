const {getRelativeSize, getMixMod, getLocation, isElem, isBlock} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "form")) {
        context.formInfo.contentNodes = [];
    }

    if (isElem(node, "form", "content")) {
        context.formInfo.contentNodes.push(node);
    }
}

function checkRuleUp(node, errors, context) {
    if (isBlock(node, "form") && context.formInfo.contentNodes && context.formInfo.size) {
        context.formInfo.contentNodes.forEach(contentNode => {
            const spaceV = getMixMod(contentNode, "form", "item", "space-v");
            if (spaceV !== getRelativeSize(context.formInfo.size, 2)) {
                errors.push({
                    code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
                    error: "Вертикальный внутренний отступ контентного элемента формы content должен быть на 2 шага больше эталонного размера.",
                    location: getLocation(contentNode)
                });
            }

            const spaceH = getMixMod(contentNode, "form", "item", "space-h");
            if (spaceH !== getRelativeSize(context.formInfo.size, 1)) {
                errors.push({
                    code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
                    error: "Горизонтальный внутренний отступ контентного элемента формы content должен быть на 1 шаг больше эталонного размера.",
                    location: getLocation(contentNode)
                });
            }
        })
    }
}

module.exports = {checkRuleDown, checkRuleUp};
