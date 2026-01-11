// Main initialization script
// This file loads all modules and handles initialization

// Enable pointer lock on click for mouse camera control
document.addEventListener('click', () => {
    const scene = document.querySelector('a-scene');
    if (scene && scene.canvas) {
        scene.canvas.requestPointerLock();
    }
});

