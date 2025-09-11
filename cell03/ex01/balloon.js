const balloon = document.getElementById('balloon');
let currentSize = 200;
const colors = ['red', 'green', 'blue'];
let colorIndex = 0;

function updateBalloonStyle() {
    balloon.style.width = currentSize + 'px';
    balloon.style.height = currentSize + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}

balloon.addEventListener('click', () => {
    currentSize += 10;

    if (currentSize > 420) {
        currentSize = 200;
        colorIndex = 0; 
    } else {
        colorIndex = (colorIndex + 1) % colors.length;
    }
 
    updateBalloonStyle();
});

balloon.addEventListener('mouseleave', () => {
    if (currentSize > 200) {
        currentSize -= 5;

        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    }
    
    updateBalloonStyle();
});