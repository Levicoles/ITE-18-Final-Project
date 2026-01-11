// Jump component with gravity
(function() {
    'use strict';
    
    AFRAME.registerComponent('jump-controls', {
        init: function () {
            this.velocity = 0;
            this.gravity = -0.01;
            this.jumpStrength = 0.15;
            this.groundLevel = 1.6;
            this.isGrounded = true;
            this.keys = {};

            // Listen for keydown and keyup events
            document.addEventListener('keydown', (e) => {
                this.keys[e.code] = true;
                if (e.code === 'Space' && this.isGrounded) {
                    this.velocity = this.jumpStrength;
                    this.isGrounded = false;
                }
            });

            document.addEventListener('keyup', (e) => {
                this.keys[e.code] = false;
            });
        },
        tick: function () {
            if (GameState.gameOver) return; // Stop jumping/gravity if game over
            
            const pos = this.el.getAttribute('position');
            const newY = pos.y + this.velocity;

            // Apply gravity
            this.velocity += this.gravity;

            // Ground collision
            if (newY <= this.groundLevel) {
                this.el.setAttribute('position', { x: pos.x, y: this.groundLevel, z: pos.z });
                this.velocity = 0;
                this.isGrounded = true;
            } else {
                // Update Y position
                this.el.setAttribute('position', { x: pos.x, y: newY, z: pos.z });
                this.isGrounded = false;
            }
        }
    });
})();

