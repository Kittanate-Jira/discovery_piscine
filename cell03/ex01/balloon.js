// --- Global Variables to track the balloon's state ---
const balloon = document.getElementById('balloon');
let currentSize = 200;
const colors = ['red', 'green', 'blue'];
let colorIndex = 0;

//updates the balloon's appearance based on the global variables
function updateBalloonStyle() {
    balloon.style.width = currentSize + 'px';
    balloon.style.height = currentSize + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}

balloon.addEventListener('click', () => {
    // Increase size by 10px
    currentSize += 10;

    // Check for explosion condition
    if (currentSize > 420) {
        // Explode! Reset to original size and color
        currentSize = 200;
        colorIndex = 0; // Reset color back to red
    } else {
        // If not exploded, cycle to the next color
        // The modulo (%) operator makes the index wrap around (0, 1, 2, 0, 1, ...)
        colorIndex = (colorIndex + 1) % colors.length;
    }
 
    updateBalloonStyle();
});

balloon.addEventListener('mouseleave', () => {
    // Only shrink if the size is greater than the minimum
    if (currentSize > 200) {
        // Decrease size by 5px
        currentSize -= 5;

        // Cycle to the previous color
        // The `+ colors.length` handles negative numbers correctly with modulo
        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    }
    
    updateBalloonStyle();
});