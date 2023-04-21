"use strict";

const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const numberButton = document.querySelectorAll(".number");
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

let operationType;
let expression;

// Adiciona o número do botão ao display da calculadora.
for (let number of numberButton) {
    number.addEventListener("click", () => {
        if (mainDisplay.textContent === "0") {
            displayIn(mainDisplay, number.textContent);
        } else if (showingResult) {
            resetCalculator(number.textContent);
            showingResult = false;
        } else {
            mainDisplay.textContent += number.textContent;
        }
    });
}

// Permite o usuario escolher uma das 4 operações
for (let operation of operations) {
    operation.addEventListener("click", () => {
        let operationSymbol;

        operationType = `${operation.classList[1]}`;
        inOperation = true;
        showingResult = false;
        num1 = Number(mainDisplay.textContent);

        switch (operationType) {
            case "plus":
                operationSymbol = "+";
                break;
            case "minus":
                operationSymbol = "-";
                break;
            case "times":
                operationSymbol = "*";
                break;
            case "div":
                operationSymbol = "/";
                break;
        }

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
    } else if (mainDisplay.textContent != "0") {
        let newDisplay = mainDisplay.textContent.slice(0, -1);
        displayIn(mainDisplay, newDisplay);
    }
});

percentButton.addEventListener("click", () => {
    let percent = Number(mainDisplay.textContent) / 100;
    displayIn(mainDisplay, percent);
});

invertButton.addEventListener("click", () => {
    let invertNum = Number(mainDisplay.textContent) * -1;
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
