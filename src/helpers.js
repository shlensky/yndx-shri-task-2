const SIZES = [
    'xxxs',
    'xxs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    'xxl',
    'xxxl',
    'xxxxl',
    'xxxxxl'
];

function getRelativeSize(size, step) {
    return SIZES[SIZES.indexOf(size) + step];
}

function findMix(node, blockName, elemName) {
    return Array.isArray(node.mix) && node.mix.find((mix) => mix.block === blockName && (elemName ? mix.elem === elemName : !mix.elem));
}

function getMixMod(node, blockName, elemName, modName) {
    const mix = findMix(node, blockName, elemName);
    return mix && mix.mods ? mix.mods[modName] : null;
}

function getMod(node, blockName, elemName, modName) {
    const mixMod = getMixMod(node, blockName, elemName, modName);
    if (mixMod) return mixMod;

    return node.mods ? node.mods[modName] : null;
}

function isBlock(node, blockName) {
    if (node.block === blockName && !node.elem) {
        return true;
    }

    return !!findMix(node, blockName);
}

function isElem(node, blockName, elemName) {
    if (node.block === blockName && node.elem === elemName) {
        return true;
    }

    return !!findMix(node, blockName, elemName);
}

function getLocation(node) {
    const loc = node.ast.loc;

    return {
        start: {line: loc.start.line, column: loc.start.column},
        end: {line: loc.end.line, column: loc.end.column}
    }
}

module.exports = { getRelativeSize, findMix, getMixMod, getMod, isBlock, isElem, getLocation };
