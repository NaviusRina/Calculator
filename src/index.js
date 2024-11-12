import './style.scss';

const IN_DISPLAY = document.querySelector(".calculator__display");
const IN_OPERATION_LIST = document.querySelector(".calculator__operation");
let calculationNote;
let result;
let inStorageArray = JSON.parse(localStorage.getItem("equation")) || [];
let btnText;



// отображение в дисплее
function insertInDisplay(num) {
  //отображение знака корня
  if (num === '№') {
    if (!IN_DISPLAY.textContent.match('\u221A')) {
      IN_DISPLAY.textContent += num.replace(/№/g, '\u221A');
    }
  }
  // ограничение введения более одного символа подряд
  else if (isNaN(num)) {
    if (num == '.' && IN_DISPLAY.textContent !== '' && !IN_DISPLAY.textContent.slice(-1).match(/[\*\-\+\/]/)) {
        let calc = IN_DISPLAY.textContent.replace(/[\*\-\+\/]/g, ' ');
        let calcArray = calc.split(' ');

        for (var i = 0; i < calcArray.length; i++) {
          if (calcArray[i].includes('.')) {
            IN_DISPLAY.textContent += '';
          } else {
            IN_DISPLAY.textContent += num;
          }
      }
    }
    else if (num.match(/[\*\.\+\/]/) && !IN_DISPLAY.textContent.match(/[0-9]/)) {
      IN_DISPLAY.textContent += '';
    }
    else if (IN_DISPLAY.textContent !== '' && isNaN(IN_DISPLAY.textContent.slice(-1))) {
      let str = IN_DISPLAY.textContent.slice(0, -1);
      IN_DISPLAY.textContent = str + num;
    }
    else  {
      IN_DISPLAY.textContent += num;
    }
  }
  //замена ноля
  else if (IN_DISPLAY.textContent == '0' && IN_DISPLAY.textContent !== '0.') {
      IN_DISPLAY.textContent = num;
  }
  //замена результата
  else if (IN_DISPLAY.textContent == result && !isNaN(num)) {
    IN_DISPLAY.textContent = num;
  }
  else {
    calculationNote = IN_DISPLAY.textContent += num;
  }
}

function btnTextClick () {
  btnText = document.querySelector("button");

  Array.prototype.slice.call(btnText).forEach(el => {
      el.addEventListener('click', e => {
        let btnValue = document.querySelector("button").value;
          insertInDisplay(btnValue);
      });
  });
}
btnTextClick ();
// document.querySelector("button").addEventListener('click', function (event) {
//   btnText = document.querySelector("button").value;
//   insertInDisplay(btnText);
// })


//набор клавиатурой
document.addEventListener("keydown", function (event) {
  if ((event.key).match(/[0-9\*\-\+\.\/]/)) {
    insertInDisplay(event.key);
  }
  else if (IN_DISPLAY.textContent && (event.key).match(/Enter/)) {
    result = eval(IN_DISPLAY.textContent);
    outputResults();
  }
  else if ((event.key).match(/Delete/)) {
    IN_DISPLAY.textContent = "";
  }
})

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
  if (result % 1 !== 0) {
    IN_DISPLAY.textContent = result.toFixed(4);
    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${result.toFixed(4)}` + `<br/>`;
  }
  else {
    IN_DISPLAY.textContent = result;
    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${result}` + `<br/>`;
  }
  storageResults();
}


//математические операции при нажатии на кнопку "="
document.querySelector("#btn-result").addEventListener("click", function (event) {
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
document.querySelector("#btn-percentage").addEventListener("click", function () {
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
document.querySelector("#btn-clean").addEventListener("click", function () {
    IN_DISPLAY.textContent = "";
})
