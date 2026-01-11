// Light flickering effect module
(function() {
    setInterval(() => {
        const light = document.querySelector('#flickerLight');
        const randomIntensity = 0.3 + Math.random() * 0.4;
        light.setAttribute('intensity', randomIntensity);
    }, 160);
})();

