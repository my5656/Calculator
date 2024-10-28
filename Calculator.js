const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber = null;
let operator = null;
let displayValue = '0';
let operatorDisplay = '';

const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');

function displayUpdate() {
    display.innerText = displayValue;
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
    if (firstNumber !== null && operator !== null) {
        inputEquals();
    }
    operator = op;
    firstNumber = currentNumber;
    operatorDisplay = `${op}`;
    displayValue = '0';
    displayUpdate();
}

function inputEquals() {
    const secondNumber = parseFloat(displayValue);
    if (firstNumber !== null && operator !== null && !isNaN(secondNumber)) {
        displayValue = operate(firstNumber, operator, secondNumber).toString();
        firstNumber = null;
        operator = null;
    } else {
        displayValue = 'Error';
    }
    displayUpdate();
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
            return divide(firstNumber, secondNumber);
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