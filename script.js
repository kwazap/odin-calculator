let buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button => button.addEventListener('click', eventHandler));
document.addEventListener('keyup', keyboardSwitch);
let invertibleButtons = Array.from(document.querySelectorAll('.invertible'));
let output = document.querySelector('.output');
let history = document.querySelector('.history');
history.textContent = '';
let operandState = 0;
let operandOne = 0;
let operandTwo = undefined;
let inputState = 1;
let currentOperation = '';
let invState = false;

let keybinds = {
    c: 'clear',
    Backspace: 'delete',
    '!': 'factorial',
    Enter: '=',
    "`" : 'inv'
    }

function eventHandler(e) {
    switchFunction(this);
}

function keyboardSwitch(e) {
    console.log(e.key, e);
    if (keybinds[e.key]) {
        switchFunction(buttons.find(button => button.id === keybinds[e.key]))
    }
    else if (buttons.find(button => button.id === e.key)) {
        switchFunction(buttons.find(button => button.id === e.key));
    }    
}

function switchFunction(x) {
    console.log(x.classList[0]);
    switch (x.classList[0]) {
        case 'number':
            inputNumber(x.id);
            break;
        case 'double-operand':
            inputOperation(x.id);
            break;
        case '=':
            operate();
            break;
        case 'clear':
            clear();
            break;
        case 'single-operand':
            singleOperandSwitch(x.id);
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
            backspace(getOperand());
            break;
        case 'sign':
            switchSign(getOperand());
            break;
        case 'rec':
            reciprocate(getOperand());
            break;
        case 'square':
            invState ? squareRoot(getOperand()) : square(getOperand());
            break;
        case 'factorial':
            factorialize(getOperand());
            break;
        case 'log':
            invState ? find10powerX(getOperand()) : findLog10(getOperand());
            break;
        case 'ln':
            invState ? exponent(getOperand()) : findLn(getOperand());
            break;
        case 'sin':
            invState ? findArcsin(getOperand()) : findSin(getOperand());
            break;
        case 'cos':
            invState ? findArccos(getOperand()) : findCos(getOperand());
            break;
        case 'tan':
            invState ? findArctan(getOperand()) : findTan(getOperand());
            break;
    
        default:
            break;
    }
    setOperand(Number(output.textContent));
}

function getOperand() {
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
        operandTwo = 0;
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
            invState ? result = operandOne ** (operandTwo = 1/operandTwo) :
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
            if (currentOperation === '^' && invState === true) {operandTwoString = `1/${operandTwo}`} else {
                operandState ? (operandTwoString = Math.round(operandTwo * 1e5) / 1e5) : (operandOneString = Math.round(operandOne * 1e5) / 1e5);
            }            
            break;
        case 'operationUpdate':
            operandTwoString = `${Math.round(operandTwo*1e5)/1e5}`;
            break;
        case '=':
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

function backspace(operand) {
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

function invertButtons() {    
    revert = ['yˣ', 'x²', 'log', 'ln', 'tan', 'cos', 'sin'];
    invert = ['ˣ√y', '√x', '10ˣ', 'eˣ', 'atan', 'acos', 'asin']
    invState ? applied = revert : applied = invert;
    for (let i = 0; i < invertibleButtons.length; i++) {
        invertibleButtons[i].textContent = applied[i];
    }
    invState = !invState;
}

function square(operand) {
    output.textContent = operand * operand;
    updateHistory('single', operand * operand, `${Math.round(operand * 1e5) / 1e5}²`);
}

function squareRoot(operand) {
    output.textContent = operand ** (1 / 2);
    updateHistory('single', operand ** (1 / 2), `√${Math.round(operand * 1e5) / 1e5}`);
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
    updateHistory('single', Math.log10(operand), `log(${Math.round(operand * 1e5) / 1e5})`);
}

function find10powerX(operand) {
    output.textContent = 10 ** operand;
    updateHistory('single', 10 ** operand, `10^(${Math.round(operand * 1e5) / 1e5})`);
}


function findLn(operand) {
    output.textContent = Math.log(operand);
    updateHistory('single', Math.log(operand), `log(${Math.round(operand * 1e5) / 1e5})`);
}

function exponent(operand) {
    output.textContent = Math.E ** operand;
    updateHistory('single', Math.E ** operand, `e^(${Math.round(operand * 1e5) / 1e5})`);
}

function findSin(operand) {
    output.textContent = Math.sin(degToRad(operand))
    updateHistory('single', Math.sin(degToRad(operand)), `sin(${Math.round(operand * 1e5) / 1e5})`)
}

function findArcsin(operand) {
    output.textContent = radToDeg(Math.asin(operand));
    updateHistory('single', radToDeg(Math.asin(operand)), `arcsin(${Math.round(operand * 1e5) / 1e5})`)
}

function findCos(operand) {
    r = Math.cos(degToRad(operand));
    r = r < 1e-15 ? r = 0 : r = r;
    output.textContent = r;
    updateHistory('single', r, `cos(${Math.round(operand * 1e5) / 1e5})`)
}

function findArccos(operand) {
    output.textContent = radToDeg(Math.acos(operand));
    updateHistory('single', radToDeg(Math.acos(operand)), `arccos(${Math.round(operand * 1e5) / 1e5})`)
}

function findTan(operand) {
    output.textContent = Math.tan(degToRad(operand))
    updateHistory('single', Math.tan(degToRad(operand)), `tan(${Math.round(operand * 1e5) / 1e5})`)
}

function findArctan(operand) {
    output.textContent = radToDeg(Math.atan(operand));
    updateHistory('single', radToDeg(Math.atan(operand)), `arctan(${Math.round(operand * 1e5) / 1e5})`)
}

function radToDeg(rads) {
    return rads * 180 / Math.PI;
}

function degToRad(degs) {
    return degs / 180 * Math.PI;
}