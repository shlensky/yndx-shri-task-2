const {getMod, isBlock, getLocation} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "text")) {
        const type = getMod(node, "text", null, "type");
        if (type === "h3") {
            context.parent.foundH3Node = node;
        } else if (type === "h2" && context.parent.foundH3Node) {
            errors.push({
                code: "TEXT.INVALID_H3_POSITION",
                error: "Заголовок третьего уровня (блок text с модификатором type h3) не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности.",
                location: getLocation(context.parent.foundH3Node)
            });
        }
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = {checkRuleDown, checkRuleUp};
