const lint = require('../src/index');

test('form content vertical space should be higher by 2 steps', () => {
    let json =
`{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },                                    
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "xl" } }]
    }
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        location: {
            start: { line: 3, column: 16 },
            end: { line: 8, column: 6 }
        }
    });
});

test('form content vertical space positive scenario', () => {
    let json = `{
        "block": "form",
        "content": {
            "block": "form",
            "elem": "content",
            "content": { "block": "input", "mods": { "size": "l" } },            
            "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "xxl" } }]
        }
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID"});
});

test('form content horizontal space should be higher by 1 step', () => {
    let json =
        `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },                                    
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl" } }]
    }
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        location: {
            start: { line: 3, column: 16 },
            end: { line: 8, column: 6 }
        }
    });
});

test('form content horizontal space positive scenario', () => {
    let json = `{
        "block": "form",
        "content": {
            "block": "form",
            "elem": "content",
            "content": { "block": "input", "mods": { "size": "l" } },            
            "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl" } }]                        
        }
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID"});
});

test('form content space checking when form size is not yet explored', () => {
    let json = (size) =>
`{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "content",
            "content": "blah",                                    
            "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "${size}" } }]
        },
        { "block": "input", "mods": { "size": "l" } }
    ]
}`;

    expect(lint(json("xxl"))).toContainObject({code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID"});
    expect(lint(json("xl"))).not.toContainObject({code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID"});
});
