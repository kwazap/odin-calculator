Array.from(document.querySelectorAll('button')).forEach(button => button.addEventListener('click', switchFunction));
let output = document.querySelector('.output');
let history = document.querySelector('.history');
history.textContent = '';
let operandState = 0;
let operandOne = 0;
let operandTwo = undefined;
let inputState = 1;
let currentOperation = '';
let invState = 0;

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
        case 'inv':
            invertButtons();
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
            switchSign(selectCurrentOperand());
            break;
        case 'rec':
            reciprocate(selectCurrentOperand());
            break;
        case 'square':
            square(selectCurrentOperand());
            break;
        case 'factorial':
            factorialize(selectCurrentOperand());
            break;
        case 'log':
            findLog10(selectCurrentOperand());
            break;
        case 'ln':
            findLn(selectCurrentOperand());
            break;
        case 'sin':
            findSin(selectCurrentOperand());
            break;
        case 'cos':
            findCos(selectCurrentOperand());
            break;
        case 'tan':
            findTan(selectCurrentOperand());
            break;
    
        default:
            break;
    }
    setOperand(Number(output.textContent));
}

function selectCurrentOperand() {
    return operandState ? operandTwo : operandOne;
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
        case '^':
            result = operandOne ** operandTwo;
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
function updateHistory(id, operand, operandString) {
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
            operandState ? (operandTwo = operand) : (operandOne = operand);
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
        operand = Number(output.textContent);
    };
    updateHistory('single',operand,operand)
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

function factorialize(operand) {
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

function findLog10(operand) {
    output.textContent = Math.log10(operand);
    updateHistory('single', Math.log10(operand), `log(${operand})`);
}

function findLn(operand) {
    output.textContent = Math.log(operand);
    updateHistory('single', Math.log(operand), `log(${operand})`);
}

function findSin(operand) {
    output.textContent = Math.sin(degToRad(operand))
    updateHistory('single', Math.sin(degToRad(operand)), `sin(${operand})`)
}

function findCos(operand) {
    r = Math.cos(degToRad(operand));
    r = r < 1e-15 ? r = 0 : r = r;
    output.textContent = r;
    updateHistory('single', r, `cos(${operand})`)
}

function findTan(operand) {
    output.textContent = Math.tan(degToRad(operand))
    updateHistory('single', Math.tan(degToRad(operand)), `tan(${operand})`)
}

function radToDeg(rads) {
    return rads * 180 / Math.PI;
}

function degToRad(degs) {
    return degs / 180 * Math.PI;
}