const rules = [
    require("./rules/form"),
    require("./rules/form.input_and_label_sizes"),
    require("./rules/form.content_vertical_space"),
    require("./rules/form.content_horizontal_space"),
    require("./rules/form.content_item_indent"),
    require("./rules/form.header_text_size."),
    require("./rules/text.several_h1"),
    require("./rules/text.invalid_h2_position"),
    require("./rules/text.invalid_h3_position"),
];

function traverse(node, errors, context) {
    let currentContext = {...context, parent: context};

    rules.forEach(function ({checkRuleDown}) {
        checkRuleDown(node, errors, currentContext);
    });

    if (node.content instanceof Array) {
        node.content.map(function(child) { traverse(child, errors, currentContext) })
    }
    else if (node.content instanceof Object) {
        traverse(node.content, errors, currentContext)
    }

    rules.forEach(function ({checkRuleUp}) {
        checkRuleUp(node, errors, currentContext);
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
