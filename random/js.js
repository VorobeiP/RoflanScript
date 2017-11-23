var s = Math.PI / 8;
var f = Math.PI;
var radius = 250;
var smallR = 20;
var zerno = 8;
var counter = 0;
var duration;

var rollButton;
var round;
var circles;


window.onload = function () {
    alert("авто-генерируемые значения под кнопкой для демки рандома. \n После завершения работы генератора нажмите на кнопку 'roll' ");
    generatorLoad();
    getDOMElements();
    for (var i = 0; i < 16; i++) {
        var newCircle = document.createElement("div");
        createNewCircle(newCircle, i);
        round.appendChild(newCircle);
    }
}

function getDOMElements() {
    rollButton = document.getElementById("startButton");
    round = document.getElementById("round");
    circles = round.getElementsByClassName("css");
    rollButton.addEventListener('click', onStartClick);
}

function createNewCircle(newCircle, i) {
    newCircle.classList.add("css");
    newCircle.style.left = radius + radius * Math.sin(f + s * i) - smallR + 'px';
    newCircle.style.top = radius + radius * Math.cos(f + s * i) - smallR + 'px';
    newCircle.angle = f + s * i;
}

function onStartClick() {
    duration = randomIntS(zerno);
    rollButton.removeEventListener("click", onStartClick);
    animate();
}

function animate() {
    if (counter < duration) {
        for (var i = 0; i < circles.length; i++) {
            draw(circles[i]);
        }
        counter++;
        requestAnimationFrame(animate);
    } else {
        counter = 0;
        var crcl = getWinCircle();
        crcl.classList.add("win");
        crcl.addEventListener('click', generate);
        crcl.addEventListener('click', clearCrcl);
    }
}

function draw(circle) { // функция движения    
    circle.style.left = (radius + radius * Math.sin(circle.angle) - smallR) / 5 + '%';
    circle.style.top = (radius + radius * Math.cos(circle.angle) - smallR) / 5 + '%';
    circle.angle = circle.angle + s / zerno;
}

function randomIntS(osnovanie) {
    var min = 10;
    var max = 20;
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand * osnovanie;
}

function getWinCircle() {
    for (var i = 0; i < circles.length; i++) {
        var left = parseInt(circles[i].style.left);
        if (left < 50 && left > 45) {
            var top = parseInt(circles[i].style.top);
            if (top < -2 && top > -4) {
                return circles[i];
            }
        }
    }
}

function clearCrcl() {
    alert("ГЦ! Вы нарандомили: " + winString);
    this.removeEventListener('click', generate);
    this.classList.remove("win");
    rollButton.addEventListener('click', onStartClick);
}