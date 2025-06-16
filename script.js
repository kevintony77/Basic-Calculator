let firstNum;
let secondNum;
let expression = '';
let operation;
let operators = ['+', '-', '*', '/']
let buttons = document.querySelectorAll('button');
let display = document.querySelector('.display');
let dotCount = 0;
display.innerText = '';
function updateDisplay() {
    display.innerText = expression;
}
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', event => {
        if (operators.includes(event.target.innerText) && !(operation) && (expression)) {
            firstNum = parseFloat(expression);
            operation = (event.target.innerText);
            console.log('firstNum: ', firstNum, 'Operation: ', operation);
            expression = expression.concat(`${event.target.innerText}`);
            updateDisplay();
            console.log(`expression: ${expression}`);

        } else if ((event.target.innerText == '=') && (firstNum !== undefined) && (operation)) {
            if ((firstNum != undefined) && operation) {
                secondNum = parseFloat(expression.slice(expression.indexOf(operation, firstNum.length) + 1))
                console.log('secondNum: ', secondNum);
            }
            if (!secondNum && operation) {
                result = expression.slice(0, expression.length - 1);

            } else {
                result = operate(firstNum, operation, secondNum);
            }
            expression = `${result}`;
            console.log(result);
            updateDisplay();
            firstNum = undefined;
            secondNum = undefined;
            operation = undefined;
        } else if (event.target.innerText == 'AC') {
            expression = '';
            firstNum = undefined;
            secondNum = undefined;
            operation = undefined;
            dotCount = 0;
            updateDisplay();
        } else if (event.target.innerText == 'Del') {
            if (operators.includes(expression.slice(expression.length - 1))) {
                operation = undefined;
            }
            if ((expression.slice(expression.length - 1)) == '.') {
                dotCount--;
            }
            expression = expression.slice(0, expression.length - 1)
            updateDisplay();
        } else if (event.target.innerText == '.') {
            if ((firstNum == undefined) && dotCount < 1) {
                if (expression) {
                    if (!(String(expression).includes('.'))) {
                        expression = expression.concat(`${event.target.innerText}`);
                        updateDisplay();
                        console.log(`expression: ${expression}`);
                        dotCount++;
                    }
                }

            } else if (firstNum) {
                if (!(operators.includes(expression.charAt(expression.length - 1)))) {
                    dotCount = dotCount == 1 ? dotCount : 0;
                    if (!(expression.includes('.', expression.indexOf('.') + 1)) && (dotCount < 1)) {
                        expression = expression.concat(`${event.target.innerText}`);
                        updateDisplay();
                        console.log(`expression: ${expression}`);
                        dotCount++;
                    }
                }
            }
        } else if (!(operators.includes(event.target.innerText)) && (event.target.innerText !== '=')) {
            expression = expression.concat(`${event.target.innerText}`);
            updateDisplay();
            console.log(`expression: ${expression}`);
        }
    })
}
function add(x, y) {
    return x + y;
}
function sub(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}
function operate(x, o, y) {
    if (o === '+') {
        return add(x, y);
    } else if (o === '-') {
        return sub(x, y);
    } else if (o === '*') {
        return multiply(x, y);
    } else if (o === '/') {
        return divide(x, y);
    }
}
