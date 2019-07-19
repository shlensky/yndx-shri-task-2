const lint = require('../src/index');

test('form content vertical space should be high by 2 steps', () => {
    let json = `{
        "block": "form",
        "content": {
            "block": "form",
            "elem": "content",
            "content": { "block": "input", "mods": { "size": "l" } },                                    
            "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "xl" } }]
        }
    }`;

    expect(lint(json)).toContainObject({code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID"});
});

test('positive scenario', () => {
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
