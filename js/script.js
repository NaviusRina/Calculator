const IN_DISPLAY = document.querySelector(".calc-display");
const IN_OPERATION_LIST = document.querySelector(".calc-operation");
let calculationNote;
let result;
let inStorageArray = [JSON.parse(localStorage.getItem("equation"))];

//отображение в дисплее
function insertInDisplay(num) {
  if (num === '№') {
    if (!IN_DISPLAY.textContent.match('\u221A')) {
      calculationNote = IN_DISPLAY.textContent += num.replace(/№/g, '\u221A');
    }
  }
  else if (isNaN(num)) {
    if (num !== IN_DISPLAY.textContent[IN_DISPLAY.textContent.length-1] && IN_DISPLAY.textContent !== '') {
      IN_DISPLAY.textContent += num;
    }
  }
  else if (IN_DISPLAY.textContent == '0' && IN_DISPLAY.textContent !== '0.') {
      calculationNote = IN_DISPLAY.textContent = num;
  }
  else if (IN_DISPLAY.textContent == result && !isNaN(num)) {
    IN_DISPLAY.textContent = num;
  }
  else {
    calculationNote = IN_DISPLAY.textContent += num;
  }
}

//локальное хранилище
function storageResults() {
  inStorageArray.push(`${calculationNote} = ${IN_DISPLAY.textContent}`);
  if (inStorageArray.length > 100) {
    inStorageArray.shift();
  }
  localStorage.setItem("equation", JSON.stringify(inStorageArray));
}

//добавление результатов ввода в дисплей и в список операций
function outputResults() {
  IN_DISPLAY.textContent = result;
  IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${result}` + `<br/>`;
  storageResults();
}


//набор клавиатурой
document.addEventListener("keydown", function (event) {
  if ((event.key).match(/[0-9\*\-\+\/]/)) {
    calculationNote = IN_DISPLAY.textContent += event.key;
  }
  else if (IN_DISPLAY.textContent && (event.key).match(/Enter/)) {
    result = eval(IN_DISPLAY.textContent);
    outputResults();
  }
  else if ((event.key).match(/Delete/)) {
    IN_DISPLAY.textContent = "";
  }
})

//математические операции при нажатии на кнопку "="
document.querySelector("#result-btn").addEventListener("click", function (event) {
  //возведение в степень
  if (IN_DISPLAY.textContent.includes('^')) {
    let elem = IN_DISPLAY.textContent.split('^');
    IN_DISPLAY.textContent = Math.pow(elem[0], elem[1]);
    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${Math.pow(elem[0], elem[1])}` + `<br/>`;
    storageResults();
  }
  //квадратный корень
  else if (IN_DISPLAY.textContent.includes('\u221A')) {
    let elem = IN_DISPLAY.textContent.replace(/\u221A/, "");
    IN_DISPLAY.textContent = Math.sqrt(elem);
    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${Math.sqrt(elem)}` + `<br/>`;
    storageResults();
  }
  //основные операции
  else {
    result = eval(IN_DISPLAY.textContent);
    outputResults();
  }
})

//вычисление процентов
document.querySelector("#percentage").addEventListener("click", function () {
    let elem = IN_DISPLAY.textContent.split(/\D/g);
    let x = elem[0];
    let y = elem[1];
    if (IN_DISPLAY.textContent.includes('*')) {
      result = x * (y / 100);
      outputResults();
    } else if (IN_DISPLAY.textContent == '') {
      IN_DISPLAY.textContent = '';
    } else {
      result = x / 100;
      outputResults();
    }
})

//вывод содержимого локального хранилища
if (localStorage.getItem("equation")) {
  IN_OPERATION_LIST.innerHTML = localStorage.getItem("equation").replace(/[a-z\"\[|\]]/g, " ").replace(/,/g, "<br />");
}

//очистка дисплея
function cleanDisplay() {
  IN_DISPLAY.textContent = "";
}
