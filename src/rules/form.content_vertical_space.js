const { getRelativeSize, getMixMod } = require("../helpers");

function checkRuleDown(node, errors, context) {

}

function checkRuleUp(node, errors, context) {
    if (node.block === "form" && node.elem === "content") {

        const spaceV = getMixMod(node, "form", "item", "space-v");
        if (spaceV !== getRelativeSize(context.formInfo.size, 2)) {
            errors.push({
                code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
                error: "Вертикальный внутренний отступ контентного элемента формы content должен быть на 2 шага больше эталонного размера."
            });
        }

    }
}

module.exports = {checkRuleDown, checkRuleUp};
