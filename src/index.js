const rules = [
    require("./rules/text.several_h1"),
    require("./rules/text.invalid_h2_position"),
    require("./rules/text.invalid_h3_position"),
];

function traverse(node, errors, context) {
    let currentContext = {...context, parent: context};

    rules.forEach(function ({checkRuleDown}) {
        let error = checkRuleDown(node, errors, currentContext);

        if (error) {
            errors.push(error);
        }
    });

    if (node.content instanceof Array) {
        node.content.map(function(child) { traverse(child, errors, currentContext) })
    }

    rules.forEach(function ({checkRuleUp}) {
        let error = checkRuleUp(node, errors, currentContext);

        if (error) {
            errors.push(error);
        }
    });

    return errors;
}

function lint(text) {
    let root = JSON.parse(text);
    const errors = [];
    const context = {
        global: {}
    };

    if (root instanceof Array) {
        root = {content: root};
    }
    traverse(root, errors, context);

    return errors;
}

module.exports = lint;
