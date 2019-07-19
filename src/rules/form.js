function checkRuleDown(node, errors, context) {
    // Create contextual form information structure
    if (node.block === "form" && !node.elem) {
        context.formInfo = {
            size: null
        };
    }
}

function checkRuleUp(node, errors, context) {

}

module.exports = {checkRuleDown, checkRuleUp};
