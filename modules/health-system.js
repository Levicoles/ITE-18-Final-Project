// Health and Level System Module
(function() {
    'use strict';
    
    // Calculate ghost health based on level (increases with level)
    function getGhostHealthForLevel(level) {
        const baseHealth = 100;
        const healthMultiplier = 1 + (level - 1) * 0.5; // Each level increases health by 50%
        return Math.round(baseHealth * healthMultiplier);
    }
    
    function updateHealthText() {
        const healthText = document.querySelector('#healthText');
        
        const percentage = Math.max(0, Math.min(100, (GameState.playerHealth / GameState.maxHealth) * 100));
        const healthString = 'Health: ' + Math.round(percentage) + '%';
        
        // Update health text
        if (healthText) {
            healthText.setAttribute('value', healthString);
        }
        
        // Check if player is dead
        if (GameState.playerHealth <= 0) {
            showGameOver();
        }
    }
    
    function showGameOver() {
        if (GameState.gameOver) return; // Prevent multiple calls
        
        GameState.gameOver = true;
        
        const gameOverMsg = document.querySelector('#gameOver');
        if (gameOverMsg) {
            gameOverMsg.style.display = 'block';
        }
        
        // Disable player controls
        const player = document.querySelector('#player');
        if (player) {
            player.setAttribute('wasd-controls', { enabled: false });
            player.setAttribute('look-controls', { enabled: false });
        }
        
        // Stop all enemy AI (they will check gameOver flag)
        // Gun shooting will also check gameOver flag
    }
    
    function updateGhostHealthText() {
        const ghostHealthText = document.querySelector('#ghostHealthText');
        
        // Calculate total health of all alive ghosts
        const aliveGhosts = GameState.ghosts.filter(g => g.health > 0);
        const totalHealth = aliveGhosts.reduce((sum, g) => sum + g.health, 0);
        const maxHealthPerGhost = getGhostHealthForLevel(GameState.currentLevel);
        const maxTotalHealth = GameState.ghosts.length * maxHealthPerGhost;
        const percentage = maxTotalHealth > 0 ? (totalHealth / maxTotalHealth) * 100 : 0;
        const healthString = 'Ghosts: ' + Math.round(percentage) + '%';
        
        // Update ghost health text
        if (ghostHealthText) {
            ghostHealthText.setAttribute('value', healthString);
        }
        
        // Check if all ghosts are dead
        if (aliveGhosts.length === 0 && GameState.ghosts.length > 0) {
            completeLevel();
        }
    }
    
    function completeLevel() {
        // Show level complete message
        const levelCompleteMsg = document.querySelector('#levelComplete');
        if (levelCompleteMsg) {
            levelCompleteMsg.textContent = 'Level ' + GameState.currentLevel + ' Done!';
            levelCompleteMsg.style.display = 'block';
        }
        
        // Move to next level after 2 seconds
        setTimeout(() => {
            if (levelCompleteMsg) {
                levelCompleteMsg.style.display = 'none';
            }
            
            if (GameState.currentLevel < GameState.maxLevel) {
                GameState.currentLevel++;
                startLevel(GameState.currentLevel);
            } else {
                // Game completed
                if (levelCompleteMsg) {
                    levelCompleteMsg.textContent = 'All Levels Completed!';
                    levelCompleteMsg.style.display = 'block';
                }
            }
        }, 2000);
    }
    
    function startLevel(level) {
        // Clear existing ghosts
        clearGhosts();
        
        // Calculate health for this level
        const ghostHealth = getGhostHealthForLevel(level);
        
        // Create ghosts for this level (level number = number of ghosts)
        const ghostPositions = [
            [10, 1.6, 10],
            [-10, 1.6, -10],
            [10, 1.6, -10],
            [-10, 1.6, 10],
            [0, 1.6, 12]
        ];
        
        const ghostsContainer = document.querySelector('#ghostsContainer');
        GameState.ghosts = [];
        
        for (let i = 0; i < level; i++) {
            const ghostEntity = document.createElement('a-entity');
            ghostEntity.id = 'ghost' + i;
            ghostEntity.setAttribute('position', {
                x: ghostPositions[i][0],
                y: ghostPositions[i][1],
                z: ghostPositions[i][2]
            });
            ghostEntity.setAttribute('enemy-ai', { level: level }); // Pass level to enemy AI
            ghostEntity.setAttribute('geometry', {
                primitive: 'plane',
                width: 2.2,
                height: 2.8
            });
            ghostEntity.setAttribute('material', {
                src: '#ghostTex',
                transparent: true,
                side: 'double'
            });
            
            // Create health indicator above ghost
            const healthIndicator = document.createElement('a-text');
            healthIndicator.id = 'ghostHealth' + i;
            healthIndicator.setAttribute('position', { x: 0, y: 2, z: 0 });
            healthIndicator.setAttribute('billboard', '');
            healthIndicator.setAttribute('value', '100%'); // Will be updated below
            healthIndicator.setAttribute('align', 'center');
            healthIndicator.setAttribute('color', '#ff0000');
            healthIndicator.setAttribute('font', 'roboto');
            healthIndicator.setAttribute('width', 2);
            healthIndicator.setAttribute('side', 'double');
            
            // Add health indicator as child of ghost
            ghostEntity.appendChild(healthIndicator);
            
            ghostsContainer.appendChild(ghostEntity);
            
            GameState.ghosts.push({
                entity: ghostEntity,
                healthIndicator: healthIndicator,
                health: ghostHealth,
                maxHealth: ghostHealth,
                id: 'ghost' + i
            });
        }
        
        // Update health text
        updateGhostHealthText();
    }
    
    function clearGhosts() {
        const ghostsContainer = document.querySelector('#ghostsContainer');
        if (ghostsContainer) {
            while (ghostsContainer.firstChild) {
                ghostsContainer.removeChild(ghostsContainer.firstChild);
            }
        }
        GameState.ghosts = [];
    }
    
    // Export functions to global scope for use by other modules
    window.HealthSystem = {
        getGhostHealthForLevel: getGhostHealthForLevel,
        updateHealthText: updateHealthText,
        updateGhostHealthText: updateGhostHealthText,
        startLevel: startLevel,
        clearGhosts: clearGhosts
    };
    
    // Initialize health text on page load
    document.addEventListener('DOMContentLoaded', () => {
        updateHealthText();
        startLevel(1); // Start level 1
    });
})();

