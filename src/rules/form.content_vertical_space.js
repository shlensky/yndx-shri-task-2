const {getRelativeSize, getMixMod, getLocation, isElem} = require("../helpers");

function checkRuleDown(node, errors, context) {

}

function checkRuleUp(node, errors, context) {
    if (isElem(node, "form", "content")) {

        const spaceV = getMixMod(node, "form", "item", "space-v");
        if (spaceV !== getRelativeSize(context.formInfo.size, 2)) {
            errors.push({
                code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
                error: "Вертикальный внутренний отступ контентного элемента формы content должен быть на 2 шага больше эталонного размера.",
                location: getLocation(node)
            });
        }

    }
}

module.exports = {checkRuleDown, checkRuleUp};
