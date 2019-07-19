const { getRelativeSize, getMixMod } = require("../helpers");

function checkRuleDown(node, errors, context) {

}

function checkRuleUp(node, errors, context) {
    if (node.block === "form" && node.elem === "content-item") {

        const indentB = getMixMod(node, "form", "item", "indent-b");
        if (indentB !== getRelativeSize(context.formInfo.size, 1)) {
            errors.push({
                code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
                error: "Строки формы (content-item) должны иметь нижний отступ со значением модификатора indent-b элемента формы item на 1 шаг больше эталонного размера."
            });
        }

    }
}

module.exports = {checkRuleDown, checkRuleUp};
