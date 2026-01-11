// Collision detection component
(function() {
    'use strict';
    
    AFRAME.registerComponent('wall-collision', {
        init: function () {
            this.boundaries = {
                minX: -14.9,
                maxX: 14.9,
                minZ: -14.9,
                maxZ: 14.9
            };
            // Box obstacles array (position, size: 2x3x2, so half-size is 1)
            this.boxObstacles = [
                { centerX: 5, centerZ: 5, minX: 4, maxX: 6, minZ: 4, maxZ: 6 },
                { centerX: -5, centerZ: -5, minX: -6, maxX: -4, minZ: -6, maxZ: -4 },
                { centerX: -8, centerZ: 8, minX: -9, maxX: -7, minZ: 7, maxZ: 9 },
                { centerX: 8, centerZ: -8, minX: 7, maxX: 9, minZ: -9, maxZ: -7 }
            ];
            this.lastValidPosition = this.el.getAttribute('position');
        },
        tick: function () {
            if (GameState.gameOver) return; // Stop collision checking if game over
            
            const pos = this.el.getAttribute('position');
            let valid = true;
            let newPos = { ...pos };

            // Check room boundaries
            if (pos.x < this.boundaries.minX) {
                newPos.x = this.boundaries.minX;
                valid = false;
            }
            if (pos.x > this.boundaries.maxX) {
                newPos.x = this.boundaries.maxX;
                valid = false;
            }
            if (pos.z < this.boundaries.minZ) {
                newPos.z = this.boundaries.minZ;
                valid = false;
            }
            if (pos.z > this.boundaries.maxZ) {
                newPos.z = this.boundaries.maxZ;
                valid = false;
            }

            // Check all box obstacles for collision
            for (let box of this.boxObstacles) {
                if (pos.x >= box.minX && pos.x <= box.maxX &&
                    pos.z >= box.minZ && pos.z <= box.maxZ) {
                    // Push player out of the box
                    const distX = Math.min(Math.abs(pos.x - box.minX), Math.abs(pos.x - box.maxX));
                    const distZ = Math.min(Math.abs(pos.z - box.minZ), Math.abs(pos.z - box.maxZ));
                    
                    if (distX < distZ) {
                        // Push to nearest X edge
                        newPos.x = pos.x < box.centerX ? box.minX : box.maxX;
                    } else {
                        // Push to nearest Z edge
                        newPos.z = pos.z < box.centerZ ? box.minZ : box.maxZ;
                    }
                    valid = false;
                    break; // Only handle one collision at a time
                }
            }

            if (!valid) {
                this.el.setAttribute('position', newPos);
            } else {
                this.lastValidPosition = pos;
            }
        }
    });
})();

