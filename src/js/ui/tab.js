var bars = document.querySelectorAll(".tab__bar");
var indexOf = function (element) {
    return Array.prototype.indexOf.call(bars, element);
};

var selectedIndex = indexOf(document.querySelector(".tab__bar--selected"));

var contents = document.querySelectorAll(".tab__content");
var tabsContainer = document.querySelector(".tab__bars");

tabsContainer.onclick = function (evt) {
    var tagName = evt.target.tagName.toLowerCase();
    if (tagName === 'button') {
        bars[selectedIndex].classList.remove("tab__bar--selected");
        contents[selectedIndex].classList.remove("tab__content--selected");
        selectedIndex = indexOf(evt.target);
        bars[selectedIndex].classList.add("tab__bar--selected");
        contents[selectedIndex].classList.add("tab__content--selected");
    }
};