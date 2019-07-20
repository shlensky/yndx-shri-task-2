const lint = require('../src/index');

test('form footer text should be the same as other form elements size', () => {
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
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "xxl"
                    }
                }
            ]
        }
    ]
}`;

    expect(lint(json)).toContainObject({
        code: "FORM.FOOTER_TEXT_SIZE_IS_INVALID",
        location: {
            start: { line: 14, column: 17 },
            end: { line: 19, column: 18 }
        }
    });
});

test('positive scenario', () => {
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
                "content": [
                    {
                        "block": "text",
                        "mods": {
                            "size": "l"
                        }
                    }
                ]
            }
        ]
    }`;

    expect(lint(json)).not.toContainObject({code: "FORM.FOOTER_TEXT_SIZE_IS_INVALID"});
});
