const lint = require('../src/index');

test('form header text should be bigger by 2 steps', () => {
    let json =
`{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "xl"
                    }
                }
            ]
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
        code: "FORM.HEADER_TEXT_SIZE_IS_INVALID",
        location: {
            start: { line: 8, column: 17 },
            end: { line: 13, column: 18 }
        }
    });
});

test('positive scenario', () => {
    let json = `{
        "block": "form",
        "content": [
            {
                "block": "form",
                "elem": "header",
                "content": [
                    {
                        "block": "text",
                        "mods": {
                            "size": "xxl"
                        }
                    }
                ]
            },
            {
                "block": "mock",
                "content": [
                    {
                        "block": "text",
                        "mods": { "size": "xl" }
                    }
                ]
            },
            {
                "block": "input",
                "mods": {
                    "size": "l"
                }
            }
        ]
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.HEADER_TEXT_SIZE_IS_INVALID"});
});
