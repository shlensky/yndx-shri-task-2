const {getMod, isBlock, getLocation} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "text")) {
        const type = getMod(node, "text", null, "type");
        if (type === "h2") {
            context.parent.foundH2Node = node;
        } else if (type === "h1" && context.parent.foundH2Node) {
            errors.push({
                code: "TEXT.INVALID_H2_POSITION",
                error: "Заголовок второго уровня (блок text с модификатором type h2) не может следовать перед заголовком первого уровня на одном или более глубоком уровне вложенности.",
                location: getLocation(context.parent.foundH2Node)
            });
        }
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = {checkRuleDown, checkRuleUp};
