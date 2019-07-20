const lint = require('../src/index');

test('form footer vertical space should be the same as other form elements size', () => {
    let json =
`{
    "block": "form",
    "content": [
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "form",
            "elem": "footer",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-v": "s" } } ]
        }
    ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.FOOTER_VERTICAL_SPACE_IS_INVALID",
        location: {
            start: { line: 10, column: 9 },
            end: { line: 14, column: 10 }
        }
    });
});

test('form header vertical space positive scenario', () => {
    let json = `{
        "block": "form",
        "content": [
            {
                "block": "input",
                "mods": {
                    "size": "l"
                }
            },
            {
                "block": "form",
                "elem": "footer",
                "mix": [ { "block": "form", "elem": "item", "mods": { "space-v": "l" } } ]
            }            
        ]
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.FOOTER_VERTICAL_SPACE_IS_INVALID"});
});

test('form footer horizontal space should be bigger then other form elements by 1 step', () => {
    let json =
`{
    "block": "form",
    "content": [
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "form",
            "elem": "footer",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "s" } } ]
        }        
    ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID",
        location: {
            start: { line: 10, column: 9 },
            end: { line: 14, column: 10 }
        }
    });
});

test('form footer horizontal space positive scenario', () => {
    let json = `{
        "block": "form",
        "content": [            
            {
                "block": "input",
                "mods": {
                    "size": "l"
                }
            },
            {
                "block": "form",
                "elem": "footer",
                "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "xl" } } ]
            }            
        ]
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID"});
});
