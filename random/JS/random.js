var chances = [0.001, 0.099, 0.2, 0.3, 0.4];
var range = [0];
var max = 10000001;
var min = 1;
var winString;

function generatorLoad() {
    initRanges();
}

function initRanges() {
    for (var i = 1; i <= itemsCount; i++) {
        range[i] = range[i - 1] + max * itemsArray[i - 1].chance;
    }
}

function randomInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function randomByChance(int) {
    for (var i = range.length - 1; i > 0; i--) {
        if (int > range[i - 1] && int < range[i]) {
            return chances[i - 1];
        }
    }
}


function generate() {
    var a = randomByChance(randomInt(min, max));
    if (a === 0.4) {
        winString = "Glock 19";
    } else if (a === 0.3) {
        winString = "P90";
    } else if (a === 0.2) {
        winString = "АК-107";
    } else if (a === 0.099) {
        winString = "L115A3";
    } else if (a === 0.001) {
        winString = "Microtech 105-7TI";
    }
}



