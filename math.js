function pAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function pSub(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function toVector(a) {
    return createVector(a[0], a[1], a[2]);
}

function toPoint(a) {
    return [a.x, a.y, a.z];
}

function colorMult(colour, intensity) {
    levels = colour.levels;
    return color(levels[0] * intensity, levels[1] * intensity, levels[2] * intensity);
}