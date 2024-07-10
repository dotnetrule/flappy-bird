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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("var canvas = document.getElementById('gameCanvas');\nvar ctx = canvas.getContext('2d');\ncanvas.width = 320;\ncanvas.height = 480;\nvar bird = new Image();\nbird.src = './assets/bird.jpg';\nvar birdX = 50;\nvar birdY = 150;\nvar gravity = 1.5;\nvar velocity = 0;\ndocument.addEventListener('keydown', function () {\n    velocity = -10;\n});\nfunction draw() {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.drawImage(bird, birdX, birdY);\n    velocity += gravity;\n    birdY += velocity;\n    requestAnimationFrame(draw);\n}\nbird.onload = draw;\n\n\n//# sourceURL=webpack://flappy-bird/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;