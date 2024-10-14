/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst IN_DISPLAY = document.querySelector(\".calc-display\");\r\nconst IN_OPERATION_LIST = document.querySelector(\".calc-operation\");\r\nlet calculationNote;\r\nlet result;\r\nlet inStorageArray = JSON.parse(localStorage.getItem(\"equation\")) || [];\r\n\r\n// отображение в дисплее\r\nfunction insertInDisplay(num) {\r\n  //отображение знака корня\r\n  if (num === '№') {\r\n    if (!IN_DISPLAY.textContent.match('\\u221A')) {\r\n      IN_DISPLAY.textContent += num.replace(/№/g, '\\u221A');\r\n    }\r\n  }\r\n  // ограничение введения более одного символа подряд\r\n  else if (isNaN(num)) {\r\n    if (num == '.' && IN_DISPLAY.textContent !== '' && !IN_DISPLAY.textContent.slice(-1).match(/[\\*\\-\\+\\/]/)) {\r\n        let calc = IN_DISPLAY.textContent.replace(/[\\*\\-\\+\\/]/g, ' ');\r\n        let calcArray = calc.split(' ');\r\n\r\n        for (var i = 0; i < calcArray.length; i++) {\r\n          if (calcArray[i].includes('.')) {\r\n            IN_DISPLAY.textContent += '';\r\n          } else {\r\n            IN_DISPLAY.textContent += num;\r\n          }\r\n      }\r\n    }\r\n    else if (num.match(/[\\*\\.\\+\\/]/) && !IN_DISPLAY.textContent.match(/[0-9]/)) {\r\n      IN_DISPLAY.textContent += '';\r\n    }\r\n    else if (IN_DISPLAY.textContent !== '' && isNaN(IN_DISPLAY.textContent.slice(-1))) {\r\n      let str = IN_DISPLAY.textContent.slice(0, -1);\r\n      IN_DISPLAY.textContent = str + num;\r\n    }\r\n    else  {\r\n      IN_DISPLAY.textContent += num;\r\n    }\r\n  }\r\n  //замена ноля\r\n  else if (IN_DISPLAY.textContent == '0' && IN_DISPLAY.textContent !== '0.') {\r\n      IN_DISPLAY.textContent = num;\r\n  }\r\n  //замена результата\r\n  else if (IN_DISPLAY.textContent == result && !isNaN(num)) {\r\n    IN_DISPLAY.textContent = num;\r\n  }\r\n  else {\r\n    calculationNote = IN_DISPLAY.textContent += num;\r\n  }\r\n}\r\n\r\n//набор клавиатурой\r\ndocument.addEventListener(\"keydown\", function (event) {\r\n  if ((event.key).match(/[0-9\\*\\-\\+\\.\\/]/)) {\r\n    insertInDisplay(event.key);\r\n  }\r\n  else if (IN_DISPLAY.textContent && (event.key).match(/Enter/)) {\r\n    result = eval(IN_DISPLAY.textContent);\r\n    outputResults();\r\n  }\r\n  else if ((event.key).match(/Delete/)) {\r\n    IN_DISPLAY.textContent = \"\";\r\n  }\r\n})\r\n\r\n//локальное хранилище\r\nfunction storageResults() {\r\n  inStorageArray.push(`${calculationNote} = ${IN_DISPLAY.textContent}`);\r\n  if (inStorageArray.length > 100) {\r\n    inStorageArray.shift();\r\n  }\r\n  localStorage.setItem(\"equation\", JSON.stringify(inStorageArray));\r\n}\r\n\r\n//добавление результатов ввода в дисплей и в список операций\r\nfunction outputResults() {\r\n  if (result % 1 !== 0) {\r\n    IN_DISPLAY.textContent = result.toFixed(4);\r\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${result.toFixed(4)}` + `<br/>`;\r\n  }\r\n  else {\r\n    IN_DISPLAY.textContent = result;\r\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${result}` + `<br/>`;\r\n  }\r\n  storageResults();\r\n}\r\n\r\n\r\n//математические операции при нажатии на кнопку \"=\"\r\ndocument.querySelector(\"#result-btn\").addEventListener(\"click\", function (event) {\r\n  //возведение в степень\r\n  if (IN_DISPLAY.textContent.includes('^')) {\r\n    let elem = IN_DISPLAY.textContent.split('^');\r\n    IN_DISPLAY.textContent = Math.pow(elem[0], elem[1]);\r\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${Math.pow(elem[0], elem[1])}` + `<br/>`;\r\n    storageResults();\r\n  }\r\n  //квадратный корень\r\n  else if (IN_DISPLAY.textContent.includes('\\u221A')) {\r\n    let elem = IN_DISPLAY.textContent.replace(/\\u221A/, \"\");\r\n    IN_DISPLAY.textContent = Math.sqrt(elem);\r\n    IN_OPERATION_LIST.innerHTML += `${calculationNote} = ${Math.sqrt(elem)}` + `<br/>`;\r\n    storageResults();\r\n  }\r\n  //основные операции\r\n  else {\r\n    result = eval(IN_DISPLAY.textContent);\r\n    outputResults();\r\n  }\r\n})\r\n\r\n//вычисление процентов\r\ndocument.querySelector(\"#percentage\").addEventListener(\"click\", function () {\r\n    let elem = IN_DISPLAY.textContent.split(/\\D/g);\r\n    let x = elem[0];\r\n    let y = elem[1];\r\n    if (IN_DISPLAY.textContent.includes('*')) {\r\n      result = x * (y / 100);\r\n      outputResults();\r\n    } else if (IN_DISPLAY.textContent == '') {\r\n      IN_DISPLAY.textContent = '';\r\n    } else {\r\n      result = x / 100;\r\n      outputResults();\r\n    }\r\n})\r\n\r\n//вывод содержимого локального хранилища\r\nif (localStorage.getItem(\"equation\")) {\r\n  IN_OPERATION_LIST.innerHTML = localStorage.getItem(\"equation\").replace(/[a-z\\\"\\[|\\]]/g, \" \").replace(/,/g, \"<br />\");\r\n}\r\n\r\n//очистка дисплея\r\nfunction cleanDisplay() {\r\n  IN_DISPLAY.textContent = \"\";\r\n}\r\n\n\n//# sourceURL=webpack://calculator/./src/index.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (5:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|   padding: 0; */\\n| /* } */\\n> .container {\\n|   display: flex;\\n|   justify-content: flex-end;\");\n\n//# sourceURL=webpack://calculator/./src/style.css?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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