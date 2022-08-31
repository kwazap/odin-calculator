Array.from(document.querySelectorAll('button')).forEach(button => button.addEventListener('click', switchFunction));
output = document.querySelector('.output');
let operandState = 0;
let operandOne = 0;
let operandTwo = 0;
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
    
        default:
            break;
    }
}

function inputNumber(x) {
    if (output.textContent === '0') {
        output.textContent = x;
    } else {
        output.textContent = output.textContent + x;
    }
    setOperand(Number(output.textContent));
}

function setOperand(x) {
    operandState ? (operandTwo = x) : (operandOne = x);
}

function inputOperation(operation) {
    operandState = 1;
    currentOperation = operation;
    output.textContent = 0;
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
    inputNumber(result);
}