const lint = require('../src/index');

test('input without form', () => {
    let json = `{ "block": "input", "mods": { "size": "l" } }`;

    expect(lint(json)).toEqual([]);
});
