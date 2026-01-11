// Gun shooting component
(function() {
    'use strict';
    
    AFRAME.registerComponent('gun-shoot', {
        init: function () {
            this.gunSound = document.querySelector('#gunSound');
            this.isPointerLocked = false;
            this.player = document.querySelector('#player');
            this.damage = 10; // Damage per shot
            
            // Listen for pointer lock changes
            document.addEventListener('pointerlockchange', () => {
                this.isPointerLocked = document.pointerLockElement !== null;
            });
            
            // Listen for mouse down events (left click)
            document.addEventListener('mousedown', (e) => {
                // Only shoot if left mouse button (button 0) and pointer is locked
                if (e.button === 0 && this.isPointerLocked) {
                    this.shoot();
                }
            });
        },
        shoot: function () {
            // Play gun sound
            if (this.gunSound) {
                this.gunSound.currentTime = 0; // Reset to start
                this.gunSound.play().catch(err => {
                    console.log('Could not play gun sound:', err);
                });
            }
            
            // Check for hit on ghost
            this.checkHit();
        },
        checkHit: function () {
            if (!this.player) return;
            
            // Check all ghosts for hits
            for (let i = 0; i < GameState.ghosts.length; i++) {
                const ghostData = GameState.ghosts[i];
                if (ghostData.health <= 0) continue; // Skip dead ghosts
                
                const ghost = ghostData.entity;
                
                // Get player and ghost positions
                const playerPos = this.player.getAttribute('position');
                const ghostPos = ghost.getAttribute('position');
                
                // Calculate distance
                const dx = ghostPos.x - playerPos.x;
                const dz = ghostPos.z - playerPos.z;
                const distance = Math.sqrt(dx * dx + dz * dz);
                
                // Check if ghost is within shooting range
                const maxRange = 25;
                if (distance > maxRange) continue;
                
                // Get camera rotation
                const cameraEl = this.player.querySelector('[camera]') || this.player;
                const cameraRot = cameraEl.getAttribute('rotation');
                const yawRad = (cameraRot.y * Math.PI) / 180;
                
                // Calculate forward direction
                const forwardX = Math.sin(yawRad);
                const forwardZ = -Math.cos(yawRad);
                
                // Calculate direction to ghost
                const dist2D = Math.sqrt(dx * dx + dz * dz);
                if (dist2D === 0) continue;
                
                const toGhostX = dx / dist2D;
                const toGhostZ = dz / dist2D;
                
                // Calculate angle using dot product
                const dot = forwardX * toGhostX + forwardZ * toGhostZ;
                const angle = Math.acos(Math.max(-1, Math.min(1, dot))) * (180 / Math.PI);
                
                // Account for ghost's size and movement
                // Ghost is 2.2 units wide, calculate angular size at this distance
                const ghostWidth = 2.2;
                const angularTolerance = (Math.atan(ghostWidth / (2 * Math.max(distance, 1))) * (180 / Math.PI)) * 2;
                
                // More forgiving angle check (40 degrees base + angular size)
                const maxAngle = 40 + angularTolerance;
                
                // Check if ghost is in front (within angle tolerance)
                if (angle <= maxAngle) {
                    this.hitGhost(ghost, ghostData);
                    break; // Only hit one ghost per shot
                }
            }
        },
        hitGhost: function (ghost, ghostData) {
            // Reduce ghost health
            ghostData.health = Math.max(0, ghostData.health - this.damage);
            
            // Update health indicator above ghost
            if (ghostData.healthIndicator) {
                const maxHealth = ghostData.maxHealth || window.HealthSystem.getGhostHealthForLevel(GameState.currentLevel);
                const percentage = Math.round((ghostData.health / maxHealth) * 100);
                ghostData.healthIndicator.setAttribute('value', percentage + '%');
            }
            
            // Hide ghost if dead
            if (ghostData.health <= 0) {
                ghost.setAttribute('visible', false);
                if (ghostData.healthIndicator) {
                    ghostData.healthIndicator.setAttribute('visible', false);
                }
            }
            
            window.HealthSystem.updateGhostHealthText();
            
            // Change ghost color to red
            ghost.setAttribute('material', {
                src: '#ghostTex',
                color: '#ff0000',
                transparent: true,
                side: 'double'
            });
            
            // Return to original color after 300ms
            setTimeout(() => {
                if (ghostData.health > 0) {
                    ghost.setAttribute('material', {
                        src: '#ghostTex',
                        transparent: true,
                        side: 'double'
                    });
                }
            }, 300);
        }
    });
})();

