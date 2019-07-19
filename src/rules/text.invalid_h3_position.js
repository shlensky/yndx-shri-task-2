const {getMod, isBlock} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "text")) {
        if (getMod(node, "type") === "h3") {
            context.parent.foundH3 = true;
        } else if (getMod(node, "type") === "h2" && context.parent.foundH3) {
            errors.push({
                code: "TEXT.INVALID_H3_POSITION",
                error: "Заголовок третьего уровня (блок text с модификатором type h3) не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности."
            });
        }
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = {checkRuleDown, checkRuleUp};
