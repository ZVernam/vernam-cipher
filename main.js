/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(6);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var bars = document.querySelectorAll(".tab__bar");
	var indexOf = function (element) {
	    return Array.prototype.indexOf.call(bars, element);
	};

	var selectedIndex = indexOf(document.querySelector(".tab__bar--selected"));

	var contents = document.querySelectorAll(".tab__content");
	var tabsContainer = document.querySelector(".tab__bars");

	tabsContainer.onclick = function (evt) {
	    bars[selectedIndex].classList.remove("tab__bar--selected");
	    contents[selectedIndex].classList.remove("tab__content--selected");
	    selectedIndex = indexOf(evt.target);
	    bars[selectedIndex].classList.add("tab__bar--selected");
	    contents[selectedIndex].classList.add("tab__content--selected");
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var vernam = __webpack_require__(3);
	var controller = __webpack_require__(5);

	controller(vernam.encrypt,
	    document.getElementById("encrypt-text"),
	    document.getElementById("encrypt-secret"),
	    document.getElementById("encrypt-cipher"));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	class Converter {
	    constructor(alphabet, nil) {
	        this.alphabet = alphabet;
	        //TODO: find the workaround of irreversible algorithm
	        // Null-symbol — subsitution for unknown character, like '\uFFFD'
	        this.nil = nil;
	    }

	    find(char) {
	        for (var i = 0; i < this.alphabet.length; i++) {
	            if(char === alphabet[i]) {
	                return i;
	            }
	        }
	        return -1;
	    }

	    toChar(i) {
	        //TODO: test and fix negative values
	        return this.alphabet[i % this.alphabet.length];
	    }
	}

	let converter = new Converter(__webpack_require__(4));

	let xor = function (left, right) {
	    return left ^ right;
	};

	module.exports = {
	    encrypt: function (text, secret) {
	        let cipher = [];
	        for (var i = 0; i < text.length; i++) {
	            var result = xor(text.charCodeAt(i), secret.charCodeAt(i % secret.length));
	            cipher.push(converter.toChar(result));
	        }
	        return cipher.join('');
	    },

	    //TODO: are not reversible at the moment
	    decrypt: function (cipher, secret) {
	        let plain = [];
	        for (var i = 0; i < cipher.length; i++) {
	            var result = xor(converter.find(cipher[i]), converter.find(secret[i % secret.length]));
	            plain.push(String.fromCharCode(result));
	        }
	        return plain;
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	const alphabet = '@bCd3f9h1jKlm2nN0pq4r$tuv5wW6x7y8Zz';
	module.exports = Array.from(alphabet);

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function (action, input, secret, output) {
	    let update = function () {
	        var text = input.value;
	        var key = secret.value;
	        if (text && key) {
	            output.value = action(text, key);
	        } else {
	            output.value = '';
	        }
	    };

	    input.oninput = update;
	    secret.oninput = update;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var vernam = __webpack_require__(3);
	var controller = __webpack_require__(5);

	controller(vernam.encrypt,
	    document.getElementById("decrypt-cipher"),
	    document.getElementById("decrypt-secret"),
	    document.getElementById("decrypt-text"));


/***/ }
/******/ ]);