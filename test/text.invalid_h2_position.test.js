const lint = require('../src/index');

test('H2 cannot appear before H1 on the same level', () => {
    let json =
`[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;

    expect(lint(json)).toContainObject({
        code: "TEXT.INVALID_H2_POSITION",
        location: {
            start: { line: 2, column: 5 },
            end: { line: 5, column: 6 }
        }
    });
});

test('H2 cannot appear before H1 on a deeper level', () => {
    let json =
`[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "p" },
        "content": [
            {
                "block": "text",
                "mods": { "type": "h1" }
            }
        ]
    }
]`;

    expect(lint(json)).toContainObject({
        code: "TEXT.INVALID_H2_POSITION",
        location: {
            start: { line: 2, column: 5 },
            end: { line: 5, column: 6 }
        }
    });
});
