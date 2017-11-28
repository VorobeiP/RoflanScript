/**
 при множественном повторении генераций
 количество сгенерированных значений будет 
 приближаться к процентам, заданным в chances
 так что алгоритм рабочий
*/
/*не вынес переменные в отдельный файл */
var chances;//шансы дропа
var names;
var range;//массив для сопоставления случайное число с шансом дропа
var max;//максимальный инт, чем больше, тем выше точность генерации
var min;//минимальный генерируемый инт
var randomButton;//ссыль на кнопку

var event =new Event("click");//событие, для кликера, 
//не смог вынести в функцию, после выхода из функции ссыль === null

var timerId;//для хранения ссыли на setInterval()
var winString;//результат


/*и так понятно */
var Glock;
var AK;
var P90;
var L96A1;

var randomCounter = 0;//счётчик упавший айтемов

/**
 * функция, выполняющаяся после загрузки страницы
 * инициализация глобальных значений
 * инициализация диапазонов массива шансов(см ниже)
 * инициализация указателей на DOM елементы
 * задание listener-ов
 * запуск кликера(нужен для демонстрации неравного рандома)
 */
window.onload = function () {
    initialiseGlobalVariables();
    initRanges();
    initialisePointersToDOMElements();
    setListeners();
    timerId = setInterval(timerGen, 10);
}


/**
 * инициализация "глобальных" переменных
 */
function initialiseGlobalVariables() {
    chances = [0.001, 0.099, 0.2, 0.3, 0.4];
    names = ["rail Gun", "AWP", "P90", "AK", "Glock"]
    range = [0];
    max = 10000001;
    min = 1;
}
/**
 *  инициализация указателей на DOM елементы
 */
function initialisePointersToDOMElements() {
    randomButton = document.getElementById("generateButton");
    Glock = document.getElementById("Glock");
    AK = document.getElementById("AK");
    P90 = document.getElementById("P90");
    AWP = document.getElementById("L96A1");
}

/**
 * задание listener-ов
 */
function setListeners() {
    randomButton.addEventListener("click", generate);
}


/**
 * запуск события 'click' в setInterval();
 */
function timerGen() {
    randomButton.dispatchEvent(event);
}


/**
 * инициализация диапазонов массива шансов\
 * 1-10 == 10%
 * 11-30 == 20%
 * и т.д
 * хранятся только граничные значения 
 */
function initRanges() {
    for (var i = 1; i <= chances.length; i++) {
        range[i] = range[i - 1] + max * chances[i - 1];
    }
}


/**
 * генератор целых чисел
 * @param {*нижняя граница} min 
 * @param {*верхняя граница} max 
 * min + Math.random() * (max - min) --неверно
 * min - 0.5 + Math.random() * (max - min + 1) -- верно 
 * учтена механика Math.round()
 */
function randomInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    /*
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
     */
    return rand;
}

/**
 * @param {*сгенерированное целое значение} int 
 * ищет, в каком диапазоне сгенерированно значение
 * на основе этого возвращает шанс из массива
 * chances = [0.001, 0.099, 0.2, 0.3, 0.4];
 */
function randomByChance(int) {
    for (var i = range.length - 1; i > 0; i--) {
        if (int > range[i - 1] && int < range[i]) {
            return chances[i - 1];
        }
    }
}


function generate() {
    var a = randomByChance(randomInt(min, max));
    randomCounter++;
    for (let i = 0; i < chances.length; i++) {
        if (chances[i] == a) {
            winString = names[i];
        }
    }
    /*служебный блок, оставлен для удобства демонстрации работы*/
    {
        if (a === 0.4) {
            Glock.innerText = (parseInt(Glock.innerText) + 1);
        } else if (a === 0.3) {
            P90.innerText = (parseInt(P90.innerText) + 1);
        } else if (a === 0.2) {
            AK.innerText = (parseInt(AK.innerText) + 1);
        } else if (a === 0.099) {
            AWP.innerText = (parseInt(AWP.innerText) + 1);
        } else if (a === 0.001) {
            alert("<<<" + "Рельсотрон!!!!! Выпал после " + randomCounter + "попыток " + ">>>");
            clearTimeout(timerId);
        }
    }
    /*конец некрасивого блока */
    randomButton.innerText = winString;
}

