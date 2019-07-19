const lint = require('../src/index');

test('form content horizontal space should be high by 1 step', () => {
    let json = `{
        "block": "form",
        "content": {
            "block": "form",
            "elem": "content",
            "content": { "block": "input", "mods": { "size": "l" } },                                    
            "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl" } }]
        }
    }`;

    expect(lint(json)).toContainObject({code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID"});
});

test('positive scenario', () => {
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
