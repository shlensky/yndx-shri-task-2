const {getMod, isBlock} = require("../helpers");

function checkRuleDown(node, errors, context) {
    if (isBlock(node, "text") && getMod(node, "type") === "h1") {
        if (context.global.containsH1) {
            errors.push({
                code: "TEXT.SEVERAL_H1",
                error: "Заголовок первого уровня (блок text с модификатором type h1) должен быть один на странице."
            });
        } else {
            context.global.containsH1 = true;
        }
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = {checkRuleDown, checkRuleUp};
