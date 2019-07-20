const lint = require('../src/index');

test('only one H1 allowed on the page', () => {
    let json =
`[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;


    expect(lint(json)).toContainObject({
        code: "TEXT.SEVERAL_H1",
        location: {
            start: { line: 6, column: 5 },
            end: { line: 9, column: 6 }
        }
    });
});
