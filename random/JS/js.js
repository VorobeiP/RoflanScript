var s;
var f;
var radius;
var duration;
var step;
var rotationSpeed;
var smallR;
var itemsCount;
var counter;
var rollButton;
var round;
var circles;
var accuracy;

var itemsArray = [];


window.onload = function () {
    // if (localStorage.getItem("loaded") == "false") {
    itemsArray = JSON.parse(localStorage.getItem("itemsArray"));
    initVars();
    generatorLoad();
    getDOMElements();
    lotsCreate();
    localStorage.setItem("loaded", true);
    // } else {
    //     localStorage.setItem("loaded", false)
    //     document.location.href = "initPage.html";
    // }

}

function initVars() {
    itemsCount = itemsArray.length;
    s = 2 * Math.PI / itemsCount;
    f = Math.PI;
    radius = 250;
    step = 16;
    rotationSpeed = s / step;
    smallR = 20;
    counter = 0;
    accuracy = 1000;
}

function lotsCreate() {
    for (var i = 0; i < itemsCount; i++) {
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
    newCircle.item = itemsArray[i];
}

function onStartClick() {
    duration = randomAngle(itemsCount);
    console.log(duration);
    //928 095 737 878 с этого разряда погрешность 504;
    //console.log(rotationSpeed);

    //rollButton.removeEventListener("click", onStartClick);
    animate();
}

function animate() {
    if (counter < duration) {
        for (var i = 0; i < circles.length; i++) {
            draw(circles[i]);
        }
        counter += rotationSpeed;
        requestAnimationFrame(animate);
    } else {
        console.log(counter);
        counter = 0;
        var crcl = getWinCircle();
        crcl.classList.add("win");
        crcl.addEventListener('click', writeRes);
        crcl.addEventListener('click', clearCrcl);
    }
}

function draw(circle) { // функция движения    
    circle.style.left = (radius + radius * Math.sin(circle.angle) - smallR) / 5 + '%';
    circle.style.top = (radius + radius * Math.cos(circle.angle) - smallR) / 5 + '%';
    circle.angle = circle.angle + rotationSpeed;
}

function randomAngle(osnovanie) {
    var min = 1;
    var max = 5;
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand * 2 * Math.PI;
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

function writeRes() {
    alert(this.item.name );
    alert(this.style.left+" "+this.style.top);
}

function clearCrcl() {
    this.removeEventListener('click', writeRes);
    this.classList.remove("win");
    rollButton.addEventListener('click', onStartClick);
}

49.923% -3.84587
49.923% -3.84587%