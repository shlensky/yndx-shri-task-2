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
    return Array.isArray(node.mix) && node.mix.find((mix) => mix.block === blockName && mix.elem === elemName);
}

function getMixMod(node, blockName, elemName, modName) {
    const mix = findMix(node, blockName, elemName);
    return mix && mix.mods ? mix.mods[modName] : null;
}

function getMod(node, modName) {
    return node.mods ? node.mods[modName] : null;
}

function isBlock(node, blockName) {
    return node.block === blockName && !node.elem;
}

function isElem(node, blockName, elemName) {
    return node.block === blockName && node.elem === elemName;
}

module.exports = { getRelativeSize, findMix, getMixMod, getMod, isBlock, isElem };
