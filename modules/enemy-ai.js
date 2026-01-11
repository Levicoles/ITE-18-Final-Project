// Enemy AI component - makes ghost attack player
(function() {
    'use strict';
    
    AFRAME.registerComponent('enemy-ai', {
        schema: {
            level: { type: 'number', default: 1 }
        },
        init: function () {
            // Get level from component data
            const level = this.data.level || 1;
            
            // Speed increases slightly with level (level 1: 0.02, level 5: 0.026)
            this.speed = 0.02 + (level - 1) * 0.0015;
            this.attackRange = 2.0;
            this.attackDamage = 5;
            this.attackCooldown = 1000; // milliseconds
            this.lastAttackTime = 0;
            this.player = document.querySelector('#player');
        },
        tick: function (time) {
            if (!this.player) return;
            
            // Find this ghost's data
            const ghostId = this.el.id;
            const ghostData = GameState.ghosts.find(g => g.id === ghostId);
            
            // Stop all behavior if ghost is dead
            if (!ghostData || ghostData.health <= 0) {
                return;
            }
            
            const enemyPos = this.el.getAttribute('position');
            const playerPos = this.player.getAttribute('position');
            
            // Calculate distance to player
            const dx = playerPos.x - enemyPos.x;
            const dz = playerPos.z - enemyPos.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            
            // Move towards player if not too close
            if (distance > this.attackRange) {
                // Normalize direction
                const dirX = dx / distance;
                const dirZ = dz / distance;
                
                // Move enemy towards player
                const newX = enemyPos.x + dirX * this.speed;
                const newZ = enemyPos.z + dirZ * this.speed;
                
                // Keep enemy within room boundaries
                const boundedX = Math.max(-14.5, Math.min(14.5, newX));
                const boundedZ = Math.max(-14.5, Math.min(14.5, newZ));
                
                this.el.setAttribute('position', {
                    x: boundedX,
                    y: enemyPos.y,
                    z: boundedZ
                });
            }
            
            // Attack player if in range
            if (distance <= this.attackRange && time - this.lastAttackTime > this.attackCooldown) {
                this.attackPlayer();
                this.lastAttackTime = time;
            }
            
            // Make ghost face player
            const angle = Math.atan2(dx, dz) * (180 / Math.PI);
            this.el.setAttribute('rotation', {
                x: 0,
                y: angle,
                z: 0
            });
        },
        attackPlayer: function () {
            // Reduce player health
            GameState.playerHealth = Math.max(0, GameState.playerHealth - this.attackDamage);
            window.HealthSystem.updateHealthText();
            
            // Game over check is handled in updateHealthText()
        }
    });
})();

