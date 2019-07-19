const lint = require('../src/index');

test('form content item should have bottom indent bigger by 1 step', () => {
    let json = `{
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

    expect(lint(json)).toContainObject({code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID"});
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
