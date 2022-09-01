Array.from(document.querySelectorAll('button')).forEach(button => button.addEventListener('click', switchFunction));
let output = document.querySelector('.output');
let history = document.querySelector('.history')
history.textContent = '';
let operandState = 0;
let operandOne = 0;
let operandTwo = 0;
let inputState = 1;
let currentOperation = '';

function switchFunction(e) {
    console.log(this.className);
    switch (this.className) {
        case 'number':
            inputNumber(this.id);
            break;
        case 'double-operand':
            inputOperation(this.id);
            break;
        case 'equal':
            operate();
            break;
        case 'clear':
            clear();
            break;
        default:
            break;
    }
}

function inputNumber(x) {
    if (!inputState) return;

    if (output.textContent === '0') {
        output.textContent = x;
    } else {
        output.textContent = output.textContent + x;
    }
    setOperand(Number(output.textContent));
    updateHistory();
}

function setOperand(x) {
    operandState ? (operandTwo = x) : (operandOne = x);
}

function inputOperation(operation) {
    operandState = 1;
    currentOperation = operation;
    if (!operandTwo) {
        output.textContent = 0;
    } else {
        output.textContent = operandTwo;
    }
    updateHistory();
}

function operate() {
    let result = 0;
    switch (currentOperation) {
        case 'add':
            result = operandOne + operandTwo;          
            break;
        case 'subtract':
            result = operandOne - operandTwo;
            break;
        case 'div':
            result = operandOne / operandTwo;
            break;
        case 'multiply':
            result = operandOne * operandTwo;
            break;    
        default:
            break;
    }
    operandState = 0;
    currentOperation = '';
    output.textContent = 0;
    inputState = 0;
    operandTwo = 0;
    history.textContent += ' =';
    inputNumber(result);
    inputState = 0;
}

function updateHistory() {
    let sign;
    switch (currentOperation) {
        case 'add':
            sign = '+ ';
            break;
        case 'subtract':
            sign = '- ';
            break;
        case 'div':
            sign = '/ ';
            break;
        case 'multiply':
            sign = '* ';
            break;
        default:
            break;
    }
    if (currentOperation !== '') {
        history.textContent = `${operandOne} ${sign}`;
    }
    if (operandTwo) {
        history.textContent = `${operandOne} ${sign} ${operandTwo}`;
    }
}

function clear() {
    console.log('dasdasd')
    operandOne = 0;
    operandTwo = 0;
    output.textContent = 0;
    history.textContent = '';
    currentOperation = '';
    operandState = 0;
    inputState = 1;
}