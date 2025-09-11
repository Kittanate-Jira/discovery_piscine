const calcForm = document.getElementById('calculator');
const leftOperandInput = document.getElementById('left-operand');
const rightOperandInput = document.getElementById('right-operand');
const operatorSelect = document.getElementById('operator');

// Set an interval to show a pop-up every 30 seconds (30000 milliseconds)
setInterval(() => {
    alert('Please, use me...');
}, 30000);

calcForm.addEventListener('submit', function(event) {
    // Prevent the default form action (page reload)
    event.preventDefault();

    // --- Input Validation ---
    const leftValue = leftOperandInput.value;
    const rightValue = rightOperandInput.value;

    // A regular expression to check if a string is a non-negative integer
    const isPositiveInteger = /^\d+$/;

    if (!isPositiveInteger.test(leftValue) || !isPositiveInteger.test(rightValue)) {
        alert('Error :(');
        return; // Stop execution if validation fails
    }

    // --- Parse Values ---
    const leftNum = parseInt(leftValue, 10);
    const rightNum = parseInt(rightValue, 10);
    const operator = operatorSelect.value;

    // --- Division/Modulo by Zero Check ---
    if ((operator === '/' || operator === '%') && rightNum === 0) {
        const errorMessage = "It's over 9000!";
        alert(errorMessage);
        console.log(errorMessage);
        return; // Stop execution
    }

    // --- Perform Calculation ---
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
            // Using Math.floor for integer division, as inputs are integers
            result = Math.floor(leftNum / rightNum);
            break;
        case '%':
            result = leftNum % rightNum;
            break;
        default:
            // This case should not be reached, but it's good practice
            alert('Error :(');
            return;
    }

    // --- Display Result ---
    alert(result);
    console.log(result);
});