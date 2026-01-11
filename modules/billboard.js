// Billboard component - makes entity always face the camera
(function() {
    'use strict';
    
    AFRAME.registerComponent('billboard', {
        tick: function () {
            const camera = document.querySelector('[camera]');
            if (!camera) return;
            
            const cameraPos = camera.object3D.getWorldPosition(new THREE.Vector3());
            const objectPos = this.el.object3D.getWorldPosition(new THREE.Vector3());
            
            // Make entity look at camera
            this.el.object3D.lookAt(cameraPos);
        }
    });
})();

