// Add function
const add = function(num1, num2){
    return num1 + num2;
}

// Subtract function
const subtract = function(num1, num2){
    return num1 - num2;
}

// Multiplication function
const multiply = function(num1, num2){
    return num1 * num2;
}


// Division function
const divide = function(num1, num2){
    if(num2 == 0){
        return num1;
    }
    return num1 / num2;
}

// Read the operator and call the relevant function
function operate(operator, num1, num2){
    var result;
    if(operator == "add"){
        result = add(num1, num2);
    }
    else if(operator == "sub"){
        result = subtract(num1, num2);
    }
    else if(operator == "mult"){
        result = multiply(num1, num2);
    }
    else if(operator == "divide"){
        result = divide(num1, num2);
    }

    // Check if the result is an int or float
    if(result % 1 === 0){
        console.log("Result is an int");
        isDecimal = false;
    }

    // Update the display content to the result of the previous operation
    if(result < 1000000000){
        displayValText.textContent = result.toString();
        StoreNum1(displayValText.textContent);
    }
    else{
        displayValText.textContent = "ERROR";
    }
}

// Highlight the pressed button for .05 of a second
function ButtonPress(item){
    item.classList.add('calcButtonSelected');
    setTimeout(() => {
        item.classList.remove('calcButtonSelected');
    }, 50);
}

// Set the display back to 0
function ClearDisplay(){
    displayVal = ['0'];
    UpdateDisplay();
}

// Function to store the currently displayed num as num1 for use in operations
function StoreNum1(num){
    if(!isDecimal){
        num1 = parseInt(num);
    }
    else{
        num1 = parseFloat(num);
    }
    displayVal = [];
}

// Remove the 'selected' class that highlight operator buttons
function RemoveSelectedClass(){
    opBtns.forEach(opBtn => {
        opBtn.classList.remove('opSelected');
    });
}

// Update the display to match the current value
function UpdateDisplay(){
    displayValText.textContent = displayVal.join('');
}

// Set up for the program
// Each number and sign is store in Display Value as a character
// To display the total content that array is joined into a single string
// Initialize all needed variables
let displayVal = ["0"];
var num1 = 0, num2 = 0, operator = "";
let isDecimal = false;

// Store reference to display element
const displayValText = document.querySelector(".calcDisplay");

// Store all number buttons
const calcBtns = document.querySelectorAll(".number");

// Add click event listener to each number button
calcBtns.forEach(calcBtn => {
    calcBtn.addEventListener('click', e => {

        // Call highlight function on click
        ButtonPress(calcBtn);

        // Overwrite the 0 that displays by default unless it is a decimal
        if(displayVal[0] == "0" && !isDecimal){
            displayVal.shift();
        }

        // Do not allow number to exceed 9 digits
        if(displayVal.length == 9){
            return;
        }

        // If there is currently no operator selected make sure none are highlighted
        if(operator != ""){
            RemoveSelectedClass();
        }

        // Add pushed number to the array and update the display
        displayVal.push(calcBtn.textContent);
        UpdateDisplay();
    });
});

// Store all of the operation buttons
const opBtns = document.querySelectorAll('.opBtns');

// Add click event listeners to each button
opBtns.forEach(opBtn => {
    opBtn.addEventListener('click', e => {

        // When an operator is chosen, if num1 isn't 0 and an operator was
        // previously selected run the next operation
        if(operator != "" && num1 != 0){
            operate(operator, num1, parseInt(displayValText.textContent));
            num1 = parseInt(displayValText.textContent);
        }

        // Set operator
        if(opBtn.textContent == '/'){
            operator = "divide";
        }
        else if(opBtn.textContent == '*'){
            operator = "mult";
        }
        else if(opBtn.textContent == '-'){
            operator = "sub";
        }
        else if(opBtn.textContent == '+'){
            operator = "add";
        }

        // Store the current value in num1 de-highlight previously
        // selected operator and highlight the new one
        StoreNum1(displayValText.textContent);

        RemoveSelectedClass();

        opBtn.classList.add('opSelected');
    });
});

// Store reference to equals button
const evalBtn = document.querySelector('.evaluator')

// Add click event listener to equals button
evalBtn.addEventListener('click', e =>{
    
    // If an operator is selected run the relevant operation and set it back to empty
    // Otherwise do nothing.
    if(operator != ""){
        operate(operator, num1, parseInt(displayValText.textContent));
        operator = "";
    }
    else{
        return;
    }
});

// Store reference to the regular clear button
const clearBtn = document.querySelector('.clear');

// Add click event listener to clear button
clearBtn.addEventListener('click', e => {

    // If display is already cleared do nothing
    // otherwise set displayVal to default remove decimals
    // and update the display
    if(displayVal[0] == "0"){
        return;
    }
    else{
        displayVal = ["0"];
        isDecimal = false;
        UpdateDisplay();
    }
});

// Store reference to the All Clear button or "super clear"
const superClearBtn = document.querySelector('.superClear');

// Add click event listener to super clear
superClearBtn.addEventListener('click', e => {

    // Reset literally everything
    displayVal = ["0"];
    UpdateDisplay();
    num1 = 0;
    num2 = 0;
    operator = "";
    isDecimal = false;
    RemoveSelectedClass();
});

// Store reference to sign change button
const posNegBtn = document.querySelector('.posNeg');

// Add click event listener to button
posNegBtn.addEventListener('click', e =>{

    // Store a temporary reference to the currently displayed value
    var currNum = parseInt(displayValText.textContent);

    // If the number is 0 it's sign can't be changed
    // If the number is positive make it negative
    // if the number is negative make it positive
    if(currNum == 0){
        return;
    }
    else if(currNum > 0){
        displayVal = currNum.toString().split('');
        displayVal.unshift("-");
        UpdateDisplay();
    }
    else if(currNum < 0){
        displayVal = currNum.toString().split('');
        displayVal.shift();
        UpdateDisplay();
    }
});

// Store reference to the decimal button
const decimalBtn = document.querySelector('.decimal');

// Add click event listener to the button
decimalBtn.addEventListener('click', e => {

    if(displayVal.length == 0){
        displayVal = ["0"];
    }

    // If the number is not a decimal make it a decimal
    // otherwise do nothing.
    if(!isDecimal){
        displayVal.splice(displayVal.length, 0, '.');
        UpdateDisplay();
        isDecimal = true;
    }
    else{
        return;
    }
});