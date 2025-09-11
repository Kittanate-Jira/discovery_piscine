// 1. Get references to the HTML elements we need
const changeButton = document.getElementById('colorChangeBtn');
const bodyElement = document.body;

// 2. Create a function to generate a random hex color
function getRandomHexColor() {
    const hexCharacters = '0123456789ABCDEF';
    let color = '#'; // Hex colors start with a #

    // Loop 6 times to create a 6-character hex string
    for (let i = 0; i < 6; i++) {
        // Pick a random character from hexCharacters
        const randomIndex = Math.floor(Math.random() * 16);
        color += hexCharacters[randomIndex];
    }
    
    return color;
}

// 3. Add an event listener to the button
// This will run the provided function every time the button is clicked
changeButton.addEventListener('click', () => {
    // When the button is clicked:
    // a. Generate a new random color
    const newRandomColor = getRandomHexColor();
    
    // b. Set the body's background color to the new color
    bodyElement.style.backgroundColor = newRandomColor;
});