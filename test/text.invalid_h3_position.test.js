const lint = require('../src/index');

test('H3 cannot appear before H2 on the same level', () => {
    let json =
`[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;

    expect(lint(json)).toContainObject({
        code: "TEXT.INVALID_H3_POSITION",
        location: {
            start: { line: 2, column: 5 },
            end: { line: 5, column: 6 }
        }
    });
});

test('H3 cannot appear before H2 on a deeper level', () => {
    let json =
`[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "p" },
        "content": [
            {
                "block": "text",
                "mods": { "type": "h2" }
            }
        ]
    }
]`;

    expect(lint(json)).toContainObject({
        code: "TEXT.INVALID_H3_POSITION",
        location: {
            start: { line: 2, column: 5 },
            end: { line: 5, column: 6 }
        }
    });
});
