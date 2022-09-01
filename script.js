Array.from(document.querySelectorAll('button')).forEach(button => button.addEventListener('click', switchFunction));
let output = document.querySelector('.output');
let history = document.querySelector('.history');
history.textContent = '';
let operandState = 0;
let operandOne = 0;
let operandTwo = undefined;
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
        case 'single-operand':
            singleOperandSwitch(this.id);
            break;
        default:
            break;
    }
}

function singleOperandSwitch(operation) {
    switch (operation) {
        case 'delete':
            backspace();
            break;
        case 'sign':
            switchSign(operation);
            break;
    
        default:
            break;
    }
    setOperand(Number(output.textContent));
}


function updateOutput(x) {
    if (output.textContent === '0') {
        output.textContent = x;
    } else {
        output.textContent = output.textContent + x;
    }
    setOperand(Number(output.textContent));
    updateHistory();
}

function inputNumber(x) {
    if (!inputState) {
        clear();
    }
    updateOutput(x);
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
    inputState = 1;
}

function operate() {
    let result = 0;
    if (!inputState) return;
    switch (currentOperation) {
        case '+':
            result = operandOne + operandTwo;          
            break;
        case '-':
            result = operandOne - operandTwo;
            break;
        case '/':
            result = operandOne / operandTwo;
            break;
        case '*':
            result = operandOne * operandTwo;
            break;    
        default:
            break;
    }
    operandState = 0;
    currentOperation = '';
    output.textContent = 0;
    inputState = 0;
    operandTwo = undefined;
    history.textContent += ' =';
    updateOutput(result);
    inputState = 0;
}

function updateHistory() {    
    if (currentOperation !== '') {
        history.textContent = `${operandOne} ${currentOperation}`;
    }
    if (!(operandTwo === undefined)) {
        history.textContent = `${operandOne} ${currentOperation} ${operandTwo}`;
    }
}

function clear() {
    console.log("CLEEEEEEEEEAR");
    operandOne = 0;
    operandTwo = undefined;
    output.textContent = 0;
    history.textContent = '';
    currentOperation = '';
    operandState = 0;
    inputState = 1;
}

function backspace() {
    if (!inputState) return;
    if (output.textContent.length <= 1) {
        output.textContent = 0;
    } else {
        output.textContent = output.textContent.slice(0, -1);
    };
}

function switchSign() {
    output.textContent = Number(output.textContent) * (-1);
}

function updateHistoryOperand() {
    historyOperands = history.textContent.split(' ')
}