const lint = require('../src/index');

test('all form elements should be the same size', () => {
    let json =
`{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },            
        { "block": "input", "mods": { "size": "s" } }                       
    ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        location: {
            start: { line: 1, column: 1 },
            end: { line: 14, column: 2 }
        }
    });
});


test('positive scenario', () => {
    let json = `{
        "block": "form",
        "content": [
            {
                "block": "form",
                "elem": "label",
                "content": {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            },            
            { "block": "input", "mods": { "size": "l" } }
        ]
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL"});
});

test('several forms', () => {
    let json =
`[{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },            
        { "block": "input", "mods": { "size": "l" } }
    ]
},
{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "s" }
            }
        },            
        { "block": "input", "mods": { "size": "l" } }
    ]
}]`;

    expect(lint(json)).toContainObject({
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        location: {
            start: { line: 15, column: 1 },
            end: { line: 28, column: 2 }
        }
    });
});

test('all form elements should be the same size (mix, positive)', () => {
    let json =
`{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },
        { 
            "block": "mock", 
            "mix": [{ "block": "input", "mods": { "size": "l" } }] 
        }                       
    ]
}`;

    expect(lint(json)).not.toContainObject({code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL"});
});

test('form element with empty size', () => {
    let json =
`{
  "block": "form",
  "content": [
    {
      "block": "input",
      "mods": { "size": "" }
    },
    {
      "block": "input",
      "mods": { "size": "l" }
    }
  ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        location: {
            start: { line: 1, column: 1 },
            end: { line: 13, column: 2 }
        }
    });
});
