function checkRuleDown(node, errors, context) {
    if (node.block === "text" &&
        node.mods instanceof Object &&
        node.mods.type === "h1") {

        if (context.global.containsH1) {
            return {
                code: "TEXT.SEVERAL_H1",
                error: "Заголовок первого уровня (блок text с модификатором type h1) должен быть один на странице."
            };
        } else {
            context.global.containsH1 = true;
        }
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = { checkRuleDown, checkRuleUp };
