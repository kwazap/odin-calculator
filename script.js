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
            switchSign(selectCurrentOperand(),selectCurrentOperandString());
            break;
        case 'rec':
            reciprocate(selectCurrentOperand(), selectCurrentOperandString());
            break;
        case 'square':
            square(selectCurrentOperand());
            break;
        case 'factorial':
            factorial(selectCurrentOperand());
            break;
    
        default:
            break;
    }
    setOperand(Number(output.textContent));
}

function selectCurrentOperand() {
    return operandState ? operandTwo : operandOne;
}

function selectCurrentOperandString() {
    return operandState ? operandTwoString : operandOneString;
}


function updateOutput(x) {
    if (output.textContent === '0') {
        output.textContent = x;
    } else {
        output.textContent = output.textContent + x;
    }
    setOperand(Number(output.textContent));
    updateHistory('numberUpdate');
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
    updateHistory('operationUpdate');
    inputState = 1;
}

function operate() {
    let result = 0;
    if (!inputState) return;
    if (!currentOperation) {
        equateOnSingleOperand(operandOne);
        return;
    };
    if (operandTwo === undefined) { inputNumber('0'); }
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


let operandOneString = operandOne;
let operandTwoString;
let operationString;
function updateHistory(id, operant, operandString) {
    switch (id) {
        case 'numberUpdate':
            operandState ? (operandTwoString = operandTwo) : (operandOneString = operandOne);
            break;
        case 'operationUpdate':
            break;
        case '=':
            console.log('dsadasdsadadadasd')
            history.textContent = `${operandOneString} =`;
            break;
        case 'single':
            history.textContent = `${operandString}`;
        default:
            operandState ? (operandTwoString = operandString) : (operandOneString = operandString);
            operandState ? (operandTwo = operant) : (operandOne = operant);
            break;
    }

    if (currentOperation !== '') {
        history.textContent = `${operandOneString} ${currentOperation}`;
    }
    if (!(operandTwo === undefined)) {
        history.textContent = `${operandOneString} ${currentOperation} ${operandTwoString}`;
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

function switchSign(operand, operandString) {
    output.textContent = Number(output.textContent) * (-1);        
    if (operand > 0) {
        operandString = `-${operand}`;
    } else {
        operandString = `-(${operand})`;
    }
    updateHistory('single', operand, operandString);
}

function reciprocate(operand, operandString) {
    output.textContent = 1 / Number(output.textContent);
    operandString = `rec(${operand})`;
    updateHistory('single', operand, operandString);
}

function equateOnSingleOperand(operand) {
    output.textContent = operand;
    updateHistory('=', operand, operandString = operand);
}

function square(operand) {
    output.textContent = operand * operand;
    updateHistory('single', operand * operand, `${operand}²`);
}

function factorial(operand) {
    if (operand < 0) return;
    function calcFactorial(x) {
        if (x < 0)
            return;
        else if (x == 1)
            return 1;
        else
            return (x * calcFactorial(x - 1));
    }
    output.textContent = calcFactorial(operand);
    updateHistory('single', operand, `!${operand}`);
}


