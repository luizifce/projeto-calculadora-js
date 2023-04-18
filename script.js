"use strict";

const mainDisplay = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const numberButton = document.querySelectorAll(".number");
const allClearButton = document.querySelector(".all-clear");

const clearButton = document.querySelector(".clear");
const operations = document.querySelectorAll(".operations");
const equalButton = document.querySelector(".equals");

let num1 = 0;
let num2 = 0;
let inOperation = false;
let showingResult = false;
let operationType;

for (let number of numberButton) {
    number.addEventListener("click", () => {
        if (mainDisplay.textContent === "0") {
            display(number.textContent);
        } else if (showingResult) {
            resetCalculator(number.textContent);
            showingResult = false;
        } else {
            mainDisplay.textContent += number.textContent;
        }
    });
}

for (let operation of operations) {
    operation.addEventListener("click", () => {
        let operationSymbol;

        operationType = `${operation.classList[1]}`;
        inOperation = true;
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

        display(0);
        subDisplay.textContent = `${num1} ${operationSymbol}`;
    });
}

equalButton.addEventListener("click", () => {
    if (inOperation) {
        let result;
        num2 = Number(mainDisplay.textContent);

        switch (operationType) {
            case "plus":
                result = num1 + num2;
                break;
            case "minus":
                result = num1 - num2;
                break;
            case "times":
                result = num1 * num2;
                break;
            case "div":
                result = num1 / num2;
                break;
        }

        display(result);
        subDisplay.textContent += ` ${num2} =`;

        num1 = result;
        num2 = 0;

        showingResult = true;
        inOperation = false;
    }
});

allClearButton.addEventListener("click", () => resetCalculator(0));
clearButton.addEventListener("click", () => {
    if (mainDisplay.textContent.length === 1) {
        display(0);
    } else if (mainDisplay.textContent != "0") {
        let newDisplay = mainDisplay.textContent.slice(0, -1);
        display(newDisplay);
    }
});

function resetCalculator(numDisplay) {
    num1 = num2 = 0;
    mainDisplay.textContent = `${numDisplay}`;
    subDisplay.textContent = "";
}

function display(numDisplay) {
    mainDisplay.textContent = `${numDisplay}`;
}