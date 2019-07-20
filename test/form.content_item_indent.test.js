const lint = require('../src/index');

test('form content item should have bottom indent bigger by 1 step', () => {
    let json =
`{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": [
            {
                "block": "form",
                "elem":  "content-item",
                "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "l" } }],
                "content": { "block": "input", "mods": { "size": "l" } }
            },
            {
                "block": "form",
                "elem":  "content-item",
                "content": { "block": "input", "mods": { "size": "l" } }
            }
        ]
    }
}`;

    const errors = lint(json);

    // first error item
    expect(errors).toContainObject({
        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
        location: {
            start: { line: 7, column: 13 },
            end: { line: 12, column: 14 }
        }
    });

    // second error item
    expect(errors).toContainObject({
        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
        location: {
            start: { line: 13, column: 13 },
            end: { line: 17, column: 14 }
        }
    });
});

test('positive scenario', () => {
    let json = `{
        "block": "form",
        "content": {
            "block": "form",
            "elem": "content",
            "content": [                
                {
                    "block": "form",
                    "elem":  "content-item",
                    "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
                    "content": { "block": "input", "mods": { "size": "l" } }
                }
            ]
        }
    }`;
    expect(lint(json)).not.toContainObject({code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID"});
});
