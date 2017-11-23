var chances = [0.001, 0.099, 0.2, 0.3, 0.4];
var range = [0];
var max = 10000001;
var min = 1;
var randomButton;
var event = new Event("click");;
var timerId;
var winString;

var Glock;
var AK;
var Petuh;
var AVP;


function generatorLoad() {
    initRanges();
    randomButton = document.getElementById("generateButton");
    document.getElementById("generateButton").addEventListener("click", generate);
    Glock = document.getElementById("Glock");
    AK = document.getElementById("AK");
    Petuh = document.getElementById("Petuh");
    AVP = document.getElementById("AVP");
    timerId = setInterval(timerGen, 10);
}

function timerGen() {
    randomButton.dispatchEvent(event);
}

function initRanges() {
    for (var i = 1; i <= chances.length; i++) {
        range[i] = range[i - 1] + max * chances[i - 1];
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

var randomCounter = 0;

function generate() {
    var a = randomByChance(randomInt(min, max));
    randomCounter++;
    if (a === 0.4) {
        winString = "Глок";
        Glock.innerText = (parseInt(Glock.innerText) + 1);
    } else if (a === 0.3) {
        winString = "Питух";
        Petuh.innerText = (parseInt(Petuh.innerText) + 1);
    } else if (a === 0.2) {
        winString = "АК-47";
        AK.innerText = (parseInt(AK.innerText) + 1);
    } else if (a === 0.099) {
        winString = "AVP";
        AVP.innerText = (parseInt(AVP.innerText) + 1);
    } else if (a === 0.001) {
        winString = "knife";
        alert("<<<" + "Ножик!!!!! Выпал после " + randomCounter + "попыток " + ">>>");
        clearTimeout(timerId);
    }
    randomButton.innerText = winString;
}



