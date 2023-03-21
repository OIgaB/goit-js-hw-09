"use strict";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

refs.startBtn.addEventListener('click', handleStartBtnClick);
refs.stopBtn.addEventListener('click', handleStopBtnClick);

let color = undefined;
let colorSwitcher = undefined;

function handleStartBtnClick(evt) {
    if (evt.target.nodeName !== 'BUTTON') {
        return;
    }
    colorSwitcher = setInterval(() => {
        color = getRandomHexColor();
        refs.body.style.backgroundColor = color;
    }, 1000);

    evt.target.disabled = true;
}

function handleStopBtnClick() {
    clearInterval(colorSwitcher);
    refs.startBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}