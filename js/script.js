const input = document.querySelector(".calc-display");
const locat = document.querySelector(".calc-operation");
var express;
var storageArray = [];
storageArray = JSON.parse(localStorage.getItem("equation"));


//отображение в дисплее
function insertInDisplay(num) {
  if (num === "№") {
    express = input.textContent += num.replace(/№/gu, '\u221A');
  }
  else {
    express = input.textContent += num;
  }
}

//локальное хранилище
function equationRes() {
  storageArray.push(`${express} = ${input.textContent}`);
  if (storageArray.length > 100) {
    storageArray.shift();
  }
  localStorage.setItem("equation", JSON.stringify(storageArray));
}

//набор клавиатурой
document.addEventListener("keydown", function (event) {
  if ((event.key).match(/[0-9\*\-\+\/]/)) {
    express = input.textContent += event.key;
  }
  else if (input.textContent && (event.key).match(/Enter/)) {
    let result = eval(input.textContent);
    input.textContent = result;
    locat.textContent += `${express} = ${result} \n`;
    equationRes();
  }
  else if ((event.key).match(/Delete/)) {
    input.textContent = "";
  }
})

//математические операции при нажатии на кнопку "="
document.querySelector("#result-btn").addEventListener("click", function (event) {
  //возведение в степень
  if (input.textContent.includes('^')) {
    let arr = input.textContent.split('^');
    input.textContent = Math.pow(arr[0], arr[1]);
    locat.textContent += `${express} = ${Math.pow(arr[0], arr[1])} \n`;
    equationRes();
  }
  //квадратный корень
  else if (input.textContent.includes('\u221A')) {
    let x = input.textContent.replace(/\u221A/, "");
    input.textContent = Math.sqrt(x);
    locat.textContent += `${express} = ${Math.sqrt(x)} \n`;
    equationRes();
  }
  //основные операции
  else {
    let result = eval(input.textContent);
    input.textContent = result;
    locat.textContent += `${express} = ${result} \n`;
    equationRes();
  }
})

//вычисление процентов
document.querySelector("#percentage").addEventListener("click", function () {
    let arr = input.textContent.split(/\D/g);
    let x = arr[0];
    let y = arr[1];
    if (input.textContent.includes('*')) {
      let result = x * (y / 100);
      input.textContent = result;
      locat.textContent += `${express}% = ${result} \n`;
      equationRes();
    } else {
      let result = x / 100;
      input.textContent = result;
      locat.textContent += `${express}% = ${result} \n`;
      equationRes();
    }
})

//вывод содержимого локального хранилища
if (localStorage.getItem("equation")) {
  locat.textContent = localStorage.getItem("equation").replace(/[,\"\[|\]]/g, " ");
}

//очистка дисплея
function clean() {
  input.textContent = "";
}
