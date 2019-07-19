const {getMod, isBlock} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "text")) {
        if (getMod(node, "type") === "h2") {
            context.parent.foundH2 = true;
        } else if (getMod(node, "type") === "h1" && context.parent.foundH2) {
            errors.push({
                code: "TEXT.INVALID_H2_POSITION",
                error: "Заголовок второго уровня (блок text с модификатором type h2) не может следовать перед заголовком первого уровня на одном или более глубоком уровне вложенности."
            });
        }
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = {checkRuleDown, checkRuleUp};
