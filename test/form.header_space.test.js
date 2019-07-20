const lint = require('../src/index');

test('form header vertical space should be the same as other form elements size', () => {
    let json =
`{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-v": "s" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.HEADER_VERTICAL_SPACE_IS_INVALID",
        location: {
            start: { line: 4, column: 9 },
            end: { line: 8, column: 10 }
        }
    });
});

test('form header vertical space should be the same as other form elements size (mix)', () => {
    let json =
`{
    "block": "payment",
    "mix": [{ "block": "form" }],
    "content": [
        {
            "block": "payment",
            "elem": "header",
            "mix": [
                { "block": "form", "elem": "header" },
                { "block": "form", "elem": "item", "mods": { "space-v": "s" } }
            ]        
        },
        { "block": "input", "mods": { "size": "l" } }
    ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.HEADER_VERTICAL_SPACE_IS_INVALID",
        location: {
            start: { line: 5, column: 9 },
            end: { line: 12, column: 10 }
        }
    });
});
test('form header vertical space should be the same as other form elements size (mix, positive)', () => {
    let json =
`{
    "block": "payment",
    "mix": [{ "block": "form" }],
    "content": [
        {
            "block": "payment",
            "elem": "header",
            "mix": [
                { "block": "form", "elem": "header" },
                { "block": "form", "elem": "item", "mods": { "space-v": "l" } }
            ]        
        },
        { "block": "input", "mods": { "size": "l" } }
    ]
}`;

    expect(lint(json)).not.toContainObject({code: "FORM.HEADER_VERTICAL_SPACE_IS_INVALID"});
});

test('form header vertical space positive scenario', () => {
    let json = `{
        "block": "form",
        "content": [
            {
                "block": "form",
                "elem": "header",
                "mix": [ { "block": "form", "elem": "item", "mods": { "space-v": "l" } } ]
            },
            {
                "block": "input",
                "mods": {
                    "size": "l"
                }
            }
        ]
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.HEADER_VERTICAL_SPACE_IS_INVALID"});
});

test('form header horizontal space should be bigger then other form elements by 1 step', () => {
    let json =
`{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "s" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID",
        location: {
            start: { line: 4, column: 9 },
            end: { line: 8, column: 10 }
        }
    });
});

test('form header horizontal space positive scenario', () => {
    let json = `{
        "block": "form",
        "content": [            
            {
                "block": "form",
                "elem": "header",
                "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "xl" } } ]
            },
            {
                "block": "input",
                "mods": {
                    "size": "l"
                }
            }
        ]
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID"});
});
