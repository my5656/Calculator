const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let inputs = [];
let firstNumber = null;
let operator = null;
let displayValue = '0';
let operatorDisplay = '';

const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');

function displayUpdate() {
    display.innerText = displayValue + operatorDisplay;
}

function inputNumber(number) {
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    displayUpdate();
}

function inputOperator(op) {
    const currentNumber = parseFloat(displayValue);
    if (!isNaN(currentNumber)) {
        inputs.push(currentNumber);
        inputs.push(op);
        operatorDisplay = ` ${op} `;
        displayValue = '';
        displayUpdate();
    }
}

function inputEquals() {
    const currentNumber = parseFloat(displayValue);
    if (!isNaN(currentNumber)) {
        inputs.push(currentNumber);
    }
    const result = calculateWithPrecedence(inputs);
    displayValue = result === 'Error' ? 'Error' : result.toString();
    inputs = [];
    operatorDisplay = '';
    displayUpdate();
}

function calculateWithPrecedence(inputs) {
    const operators = { '+': add, '-': subtract, '*': multiply, '/': divide };
    let newInputs = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] === '*' || inputs[i] === '/') {
            const prevNumber = newInputs.pop();
            const nextNumber = inputs[i + 1];
            if (inputs[i] === '/' && nextNumber === 0) return 'Error';
            const result = operators[inputs[i]](prevNumber, nextNumber);
            newInputs.push(result);
            i++;
        } else {
            newInputs.push(inputs[i]);
        }
    }
    let result = newInputs[0];
    for (let i = 1; i < newInputs.length; i += 2) {
        const operator = newInputs[i];
        const nextNumber = newInputs[i + 1];
        result = operators[operator](result, nextNumber);
    }

    return result;
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return secondNumber === 0 ? 'Error' : divide(firstNumber, secondNumber);
        default:
            return 'Error';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        const buttonText = event.target.innerText;

        if (button.classList.contains('number')) {
            inputNumber(buttonText);
        }
        else if (button.classList.contains('operator')) {
            inputOperator(buttonText === 'x' ? '*' : buttonText === '÷' ? '/' : buttonText);
        }
        else if (button.classList.contains('equal')) {
            inputEquals();
        }
        else if (button.classList.contains('decimal')) {
            inputDecimal();
            displayUpdate();
        }
        else if (button.classList.contains('percent')) {
            inputPercent(displayUpdate);
            displayUpdate();
        }
        else if (button.classList.contains('sign')) {
            inputSign(displayUpdate);
        }
        else if (button.classList.contains('clear')) {
            clearDisplay();
        }
    });
}
);

function clearDisplay() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    displayUpdate();
}

displayUpdate();