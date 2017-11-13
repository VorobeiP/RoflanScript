
var glyphClose = "&#x2718";
var newTaskField;
var taskList;
//тащим таски с localStorage
//также вызывается при обновленииsd
window.onload = function () {
    document.getElementById("addButton").onclick = newElement;
    document.getElementById("deleteButton").onclick = deleteSelected;
    newTaskField = document.getElementById("newTask");
    taskList = document.getElementById("taskList"); 
    listBuild();   
}

function listBuild(){
    var size = localStorage.length - 1;
    if (size) {
        var selectedTasks = localStorage.getItem(size).split(",");
        var check = undefined;
        for (var i = 0, j = 0; i < size; i++) {
            if (selectedTasks[j] == i) {
                check = selectedTasks[j];
                j++;
            }
            addTask(localStorage.getItem(i), check);
            check = undefined;
        }
    }    
}

//задания могут смещаться, либо сравнивать все либо перезаписать все
//сохраняем задания при выходе
//последнее значение -- индексы выбранных пользователем строк
window.onunload = function () {
    localStorage.clear();
    var selectedTasks = '';
    var allTasks = document.getElementsByTagName("li");
    var i = 0
    for (i; i < allTasks.length; i++) {
        localStorage.setItem(i, allTasks[i].getElementsByTagName("span")[0].innerText);
        if (allTasks[i].classList.contains('checked')) {
            selectedTasks = selectedTasks + ',' + i;
        }
    }
    selectedTasks = selectedTasks.slice(1);
    if (!selectedTasks) {
        selectedTasks = 'null';
    }
    localStorage.setItem(i, selectedTasks);
}

//новый элемент, функция кнопки Add

function newElement() {
    if (newTaskField.value.trim()) {
        addTask(newTaskField.value);
    } else {
        alert('Зачем тебе пустое задание, глупенький?\nИ да, лишние пробелы оставь себе)))');
    }
    newTaskField.value = "";
}

//функция, заворачивает строку в теги для добавления в список, присобачивает кнопку 
function addTask(newTask, selectedTasks) {
    var li = document.createElement("li");
    var text = document.createElement("span");
    text.innerText = newTask;
    li.appendChild(text);
    li.onclick = onTaskComplete;
    addCloseGlyph(li);
    taskList.appendChild(li);
    if (selectedTasks != undefined) {
        li.classList.toggle("checked");
    }
}

//удаляет задание по клику на крестик
function deleteTask() {
    var li = this.parentNode;
    li.remove();
}

//добавляет крестик к заданию
function addCloseGlyph(li) {
    var button = document.createElement("text");
    button.innerHTML = glyphClose;
    button.className = "close";
    button.onclick = deleteTask;
    li.appendChild(button);
}

// добавляет/убирает класс checked
function onTaskComplete() {
    if (this.classList.contains('checked')) {
        this.classList.remove('checked');
    } else {
        this.classList.toggle('checked');
    }
}

// действие на событие тыка кнопки удаления
function deleteSelected() {
    var list = document.getElementsByTagName("li");
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].classList.contains('checked')) {
            list[i].remove();
        }
    }
}
