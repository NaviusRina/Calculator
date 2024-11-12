/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\nconst IN_DISPLAY = document.querySelector(\".calculator__display\");\nconst IN_OPERATION_LIST = document.querySelector(\".calculator__operation\");\nlet calculationNote;\nlet result;\nlet inStorageArray = JSON.parse(localStorage.getItem(\"equation\")) || [];\nlet btnText;\n\n// отображение в дисплее\nfunction insertInDisplay(num) {\n  //отображение знака корня\n  if (num === '№') {\n    if (!IN_DISPLAY.textContent.match('\\u221A')) {\n      IN_DISPLAY.textContent += num.replace(/№/g, '\\u221A');\n    }\n  }\n  // ограничение введения более одного символа подряд\n  else if (isNaN(num)) {\n    if (num == '.' && IN_DISPLAY.textContent !== '' && !IN_DISPLAY.textContent.slice(-1).match(/[\\*\\-\\+\\/]/)) {\n      let calc = IN_DISPLAY.textContent.replace(/[\\*\\-\\+\\/]/g, ' ');\n      let calcArray = calc.split(' ');\n      for (var i = 0; i < calcArray.length; i++) {\n        if (calcArray[i].includes('.')) {\n          IN_DISPLAY.textContent += '';\n        } else {\n          IN_DISPLAY.textContent += num;\n        }\n      }\n    } else if (num.match(/[\\*\\.\\+\\/]/) && !IN_DISPLAY.textContent.match(/[0-9]/)) {\n      IN_DISPLAY.textContent += '';\n    } else if (IN_DISPLAY.textContent !== '' && isNaN(IN_DISPLAY.textContent.slice(-1))) {\n      let str = IN_DISPLAY.textContent.slice(0, -1);\n      IN_DISPLAY.textContent = str + num;\n    } else {\n      IN_DISPLAY.textContent += num;\n    }\n  }\n  //замена ноля\n  else if (IN_DISPLAY.textContent == '0' && IN_DISPLAY.textContent !== '0.') {\n    IN_DISPLAY.textContent = num;\n  }\n  //замена результата\n  else if (IN_DISPLAY.textContent == result && !isNaN(num)) {\n    IN_DISPLAY.textContent = num;\n  } else {\n    calculationNote = IN_DISPLAY.textContent += num;\n  }\n}\nfunction btnTextClick() {\n  btnText = document.querySelector(\"button\");\n  Array.prototype.slice.call(btnText).forEach(el => {\n    el.addEventListener('click', e => {\n      let btnValue = document.querySelector(\"button\").value;\n      insertInDisplay(btnValue);\n    });\n  });\n}\nbtnTextClick();\n// document.querySelector(\"button\").addEventListener('click', function (event) {\n//   btnText = document.querySelector(\"button\").value;\n//   insertInDisplay(btnText);\n// })\n\n//набор клавиатурой\ndocument.addEventListener(\"keydown\", function (event) {\n  if (event.key.match(/[0-9\\*\\-\\+\\.\\/]/)) {\n    insertInDisplay(event.key);\n  } else if (IN_DISPLAY.textContent && event.key.match(/Enter/)) {\n    result = eval(IN_DISPLAY.textContent);\n    outputResults();\n  } else if (event.key.match(/Delete/)) {\n    IN_DISPLAY.textContent = \"\";\n  }\n});\n\n//локальное хранилище\nfunction storageResults() {\n  inStorageArray.push(`${calculationNote} = ${IN_DISPLAY.textContent}`);\n  if (inStorageArray.length > 100) {\n    inStorageArray.shift();\n  }\n  localStorage.setItem(\"equation\", JSON.stringify(inStorageArray));\n}\n\n//добавление результатов ввода в дисплей и в список операций\nfunction outputResults() {\n  if (result % 1 !== 0) {\n    IN_DISPLAY.textContent = result.toFixed(4);\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${result.toFixed(4)}` + `<br/>`;\n  } else {\n    IN_DISPLAY.textContent = result;\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${result}` + `<br/>`;\n  }\n  storageResults();\n}\n\n//математические операции при нажатии на кнопку \"=\"\ndocument.querySelector(\"#btn-result\").addEventListener(\"click\", function (event) {\n  //возведение в степень\n  if (IN_DISPLAY.textContent.includes('^')) {\n    let elem = IN_DISPLAY.textContent.split('^');\n    IN_DISPLAY.textContent = Math.pow(elem[0], elem[1]);\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${Math.pow(elem[0], elem[1])}` + `<br/>`;\n    storageResults();\n  }\n  //квадратный корень\n  else if (IN_DISPLAY.textContent.includes('\\u221A')) {\n    let elem = IN_DISPLAY.textContent.replace(/\\u221A/, \"\");\n    IN_DISPLAY.textContent = Math.sqrt(elem);\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${Math.sqrt(elem)}` + `<br/>`;\n    storageResults();\n  }\n  //основные операции\n  else {\n    result = eval(IN_DISPLAY.textContent);\n    outputResults();\n  }\n});\n\n//вычисление процентов\ndocument.querySelector(\"#btn-percentage\").addEventListener(\"click\", function () {\n  let elem = IN_DISPLAY.textContent.split(/\\D/g);\n  let x = elem[0];\n  let y = elem[1];\n  if (IN_DISPLAY.textContent.includes('*')) {\n    result = x * (y / 100);\n    outputResults();\n  } else if (IN_DISPLAY.textContent == '') {\n    IN_DISPLAY.textContent = '';\n  } else {\n    result = x / 100;\n    outputResults();\n  }\n});\n\n//вывод содержимого локального хранилища\nif (localStorage.getItem(\"equation\")) {\n  IN_OPERATION_LIST.innerHTML = localStorage.getItem(\"equation\").replace(/[a-z\\\"\\[|\\]]/g, \" \").replace(/,/g, \"<br />\");\n}\n\n//очистка дисплея\ndocument.querySelector(\"#btn-clean\").addEventListener(\"click\", function () {\n  IN_DISPLAY.textContent = \"\";\n});\n\n//# sourceURL=webpack://calculator/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://calculator/./src/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;