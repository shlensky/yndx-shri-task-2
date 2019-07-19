const { getRelativeSize, getMixMod } = require("../helpers");

function checkRuleDown(node, errors, context) {

}

function checkRuleUp(node, errors, context) {
    if (node.block === "form" && node.elem === "content") {

        const spaceH = getMixMod(node, "form", "item", "space-h");
        if (spaceH !== getRelativeSize(context.formInfo.size, 1)) {
            errors.push({
                code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
                error: "Горизонтальный внутренний отступ контентного элемента формы content должен быть на 1 шаг больше эталонного размера."
            });
        }

    }
}

module.exports = {checkRuleDown, checkRuleUp};
