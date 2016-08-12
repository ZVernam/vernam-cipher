"use strict";

var vernam = require('./vernam.js');

let textInput = document.getElementById("encrypt-text");
let secretInput = document.getElementById("encrypt-secret");
let cipherOutput = document.getElementById("encript-cipher");

let update = function () {
    var text = textInput.value;
    var secret = secretInput.value;
    if (text && secret) {
        cipherOutput.value = vernam.encrypt(text, secret);
    } else {
        cipherOutput.value = '';
    }
};

textInput.oninput = update;
secretInput.oninput = update;

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