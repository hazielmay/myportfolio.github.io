
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let startNewNumber = true;

function updateDisplay() {
    display.value = currentInput;
}

function enterNumber(number) {
    if (startNewNumber || currentInput === "0") {
        currentInput = number;
        startNewNumber = false;
    } else if (currentInput.length < 15) {
        currentInput += number;
    }

    updateDisplay();
}

function enterDecimal() {
    if (startNewNumber) {
        currentInput = "0.";
        startNewNumber = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    startNewNumber = true;
    updateDisplay();
}

function deleteNumber() {
    if (startNewNumber) return;

    currentInput = currentInput.length > 1
        ? currentInput.slice(0, -1)
        : "0";

    if (currentInput === "-") currentInput = "0";

    updateDisplay();
}

function percentage() {
    currentInput = String(parseFloat(currentInput) / 100);
    startNewNumber = true;
    updateDisplay();
}

function calculate(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "−": return a - b;
        case "×": return a * b;
        case "÷":
            if (b === 0) return null;
            return a / b;
        default: return b;
    }
}

function selectOperator(selectedOperator) {
    const value = parseFloat(currentInput);

    if (operator !== null && !startNewNumber) {
        const result = calculate(firstNumber, value, operator);

        if (result === null) {
            currentInput = "Cannot divide by zero";
            firstNumber = null;
            operator = null;
            startNewNumber = true;
            updateDisplay();
            return;
        }

        firstNumber = result;
        currentInput = String(result);
    } else {
        firstNumber = value;
    }

    operator = selectedOperator;
    startNewNumber = true;
    updateDisplay();
}

function calculateResult() {
    if (operator === null || startNewNumber) return;

    const secondNumber = parseFloat(currentInput);
    const result = calculate(firstNumber, secondNumber, operator);

    if (result === null) {
        currentInput = "Cannot divide by zero";
    } else {
        currentInput = String(Number(result.toPrecision(12)));
    }

    firstNumber = null;
    operator = null;
    startNewNumber = true;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (/^[0-9]$/.test(value)) {
            enterNumber(value);
        } else if (value === ".") {
            enterDecimal();
        } else if (value === "AC") {
            clearCalculator();
        } else if (value === "DEL") {
            deleteNumber();
        } else if (value === "%") {
            percentage();
        } else if (value === "=") {
            calculateResult();
        } else {
            selectOperator(value);
        }
    });
});
