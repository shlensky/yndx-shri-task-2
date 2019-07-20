const {getMod, isBlock, isElem, getLocation} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "form")) {
        context.formInfo.footerTextNodes = [];
    }

    if (isElem(node, "form", "footer")) {
        context.insideFooter = true;
    }

    if (isBlock(node, "text") && context.insideFooter) {
        context.formInfo.footerTextNodes.push(node);
    }
}

function checkRuleUp(node, errors, context) {
    if (isBlock(node, "form") && context.formInfo.footerTextNodes) {
        return context.formInfo.footerTextNodes.map((textNode) => {
            if (getMod(textNode, "size") !== context.formInfo.size) {
                errors.push({
                    code: "FORM.FOOTER_TEXT_SIZE_IS_INVALID",
                    error: "Размер текстовых блоков в подвале формы должен соответствовать эталонному.",
                    location: getLocation(textNode)
                });
            }
        });
    }
}

module.exports = {checkRuleDown, checkRuleUp};
