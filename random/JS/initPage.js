var inputUI;
var nodesArray = [];
var nodePattern;
var fieldName1 = "Лут: ";
var fieldName2 = " Шанс дропа: ";
var confirm;
var itemsArray = [];


window.onload = function () {
    inputUI = document.getElementById("inputUI");
    confirm = document.getElementById("confirm");
    confirm.addEventListener('click', onConfirmClick);
    createNodePattern(fieldName1, fieldName2);
    inputBlockCreate();
}

function inputBlockCreate() {
    var newNode = nodePattern.cloneNode(true);
    newNode.childNodes[3].addEventListener('input', newInputNodeListener);
    inputUI.appendChild(newNode);
    nodesArray.push(newNode);
}

function newInputNodeListener() {
    inputBlockCreate();
    this.removeEventListener('input', newInputNodeListener);
}


function createNodePattern(text1, text2) {
    var input;
    nodePattern = document.createElement("li");
    input = document.createElement("input");
    nodePattern.appendChild(document.createTextNode(text1));
    nodePattern.appendChild(input);
    nodePattern.appendChild(document.createTextNode(text2));
    nodePattern.appendChild(input.cloneNode(true));
}

function onConfirmClick() {
    var i;
    var name;
    var chance;
    var item;
    if (nodesArray.length > 1) {
        for (i = 0; i < nodesArray.length - 1; i++) {
            name = nodesArray[i].childNodes[1].value;
            chance = nodesArray[i].childNodes[3].value;
            itemsArray.push(new Item(name, chance));
        }
    }
    if (itemsArray.length > 1) {
        document.location.href = "html.html";
        localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
    } else {
        alert("Введите больше 1  значения!!!");
    }
}