"use strict";

const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const numberButtons = document.querySelectorAll(".number");
const allClearButton = document.querySelector(".all-clear");

const clearButton = document.querySelector(".clear");
const operations = document.querySelectorAll(".operations");
const equalButton = document.querySelector(".equals");
const percentButton = document.querySelector(".percent");

const invertButton = document.querySelector(".invert");

let num1 = 0;
let num2 = 0;
let inOperation = false;
let showingResult = false;

let expression;

// Adiciona o número do botão ao display da calculadora.
for (const number of numberButtons) {
    number.addEventListener("click", () => {
        const num = number.textContent;
        if (num !== ".") {
            if (mainDisplay.textContent === "0") {
                displayIn(mainDisplay, num);
            } else if (showingResult) {
                resetCalculator(num);
                showingResult = false;
            } else {
                mainDisplay.textContent += num;
            }
        } else {
            mainDisplay.textContent.includes(".")
                ? (mainDisplay.textContent += "")
                : (mainDisplay.textContent += num);
        }
    });
}

// Permite o usuario escolher uma das 4 operações
for (const operation of operations) {
    operation.addEventListener("click", () => {
        const operationSymbol = `${operation.classList[1]}`;

        inOperation = true;
        showingResult = false;
        num1 = Number(mainDisplay.textContent);

        displayIn(mainDisplay, 0);
        expression = `${num1} ${operationSymbol}`;
        displayIn(subDisplay, expression);
    });
}

// Mostra o resultado da operação escolhida com os dois números que foram digitados.
equalButton.addEventListener("click", () => {
    if (inOperation) {
        num2 = Number(mainDisplay.textContent);
        expression += ` ${num2}`;
        let result = eval(expression);

        if (result.toString().length > 10) {
            result = result.toFixed(10);
        }

        expression += " =";

        displayIn(mainDisplay, result);
        displayIn(subDisplay, expression);

        num1 = result;
        num2 = 0;

        showingResult = true;
        inOperation = false;
    }
});

allClearButton.addEventListener("click", () => resetCalculator(0));

clearButton.addEventListener("click", () => {
    if (mainDisplay.textContent.length === 1) {
        displayIn(mainDisplay, 0);
    } else if (mainDisplay.textContent !== "0") {
        const newDisplay = mainDisplay.textContent.slice(0, -1);
        displayIn(mainDisplay, newDisplay);
    }
});

percentButton.addEventListener("click", () => {
    const percent = Number(mainDisplay.textContent) / 100;
    displayIn(mainDisplay, percent);
});

invertButton.addEventListener("click", () => {
    const invertNum = Number(mainDisplay.textContent) * -1;
    displayIn(mainDisplay, invertNum);
});

function resetCalculator(numDisplay) {
    num1 = num2 = 0;
    mainDisplay.textContent = `${numDisplay}`;
    subDisplay.textContent = "";
}

function displayIn(display, content) {
    display.textContent = `${content}`;
}
