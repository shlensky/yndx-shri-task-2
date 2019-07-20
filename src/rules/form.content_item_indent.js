const {getRelativeSize, getMixMod, getLocation, isElem} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isElem(node, "form", "content")) {
        context.formContentInfo = {
            contentItems: []
        }
    }

    if (isElem(node, "form", "content-item")) {
        context.formContentInfo.contentItems.push(node);
    }
}

function checkRuleUp(node, errors, context) {
    if (isElem(node, "form", "content")) {
        context.formContentInfo.contentItems.forEach((contentItemNode, i) => {
            const indentB = getMixMod(contentItemNode, "form", "item", "indent-b");
            const isLast = i === (context.formContentInfo.contentItems.length - 1);

            if (isLast) {
                if (indentB) {
                    errors.push({
                        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
                        error: "Последний элемент строки формы (content-item) не должен иметь нижний отступ.",
                        location: getLocation(contentItemNode)
                    });
                }
            } else {
                if (indentB !== getRelativeSize(context.formInfo.size, 1)) {
                    errors.push({
                        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
                        error: "Строки формы (content-item) должны иметь нижний отступ со значением модификатора indent-b элемента формы item на 1 шаг больше эталонного размера.",
                        location: getLocation(contentItemNode)
                    });
                }
            }
        });
    }
}

module.exports = {checkRuleDown, checkRuleUp};
