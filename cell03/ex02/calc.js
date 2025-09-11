const calcForm = document.getElementById('calculator');
const leftOperandInput = document.getElementById('left-operand');
const rightOperandInput = document.getElementById('right-operand');
const operatorSelect = document.getElementById('operator');

setInterval(() => {
    alert('Please, use me...');
}, 30000);

calcForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const leftValue = leftOperandInput.value;
    const rightValue = rightOperandInput.value;

    const isPositiveInteger = /^\d+$/;

    if (!isPositiveInteger.test(leftValue) || !isPositiveInteger.test(rightValue)) {
        alert('Error :(');
        return; 
    }

    const leftNum = parseInt(leftValue, 10);
    const rightNum = parseInt(rightValue, 10);
    const operator = operatorSelect.value;

    if ((operator === '/' || operator === '%') && rightNum === 0) {
        const errorMessage = "It's over 9000!";
        alert(errorMessage);
        console.log(errorMessage);
        return; 
    }

    let result;
    switch (operator) {
        case '+':
            result = leftNum + rightNum;
            break;
        case '-':
            result = leftNum - rightNum;
            break;
        case '*':
            result = leftNum * rightNum;
            break;
        case '/':
            result = Math.floor(leftNum / rightNum);
            break;
        case '%':
            result = leftNum % rightNum;
            break;
        default:
            alert('Error :(');
            return;
    }

    alert(result);
    console.log(result);
});