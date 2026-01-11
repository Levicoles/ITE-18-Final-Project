# ITE 18 Final Project - 3D First-Person Shooter Game

A thrilling 3D first-person shooter game built with A-Frame, featuring ghost enemies, immersive atmosphere, and multiple levels of increasing difficulty.

## 📖 Project Story

This project was developed as the final assignment for ITE 18, showcasing skills in 3D web development, game mechanics implementation, and interactive web applications. The game was built from scratch using A-Frame, a powerful framework for creating VR and 3D experiences in the browser.

The development journey involved creating a modular game architecture with separate components for different game systems, implementing enemy AI, collision detection, health management, and creating an atmospheric horror-themed environment with flickering lights and ambient sound effects.

## 🎮 Game Concept

**Genre:** First-Person Shooter / Horror Action

**Core Gameplay:**
- Navigate through a dark, enclosed environment filled with hostile ghost enemies
- Eliminate all ghosts to complete each level
- Survive enemy attacks and manage your health carefully
- Progress through 5 increasingly challenging levels

**Key Features:**
- **First-Person Controls**: Mouse look with pointer lock for immersive camera control
- **Combat System**: Shoot ghosts with your weapon to defeat them
- **Enemy AI**: Intelligent ghosts that chase and attack the player
- **Health System**: Track both player and enemy health with visual indicators
- **Atmospheric Design**: Flickering lights, fog effects, and ambient music create a tense atmosphere
- **Multiple Levels**: 5 levels with increasing difficulty (faster enemies as you progress)
- **Movement Mechanics**: WASD movement, jumping, and wall collision detection
- **3D Environment**: Fully enclosed room with walls, floor, ceiling, and obstacles

## 🛠️ Development Stack

### Core Technologies
- **A-Frame 1.5.0** - WebVR framework for 3D/VR experiences
- **HTML5** - Markup structure
- **CSS3** - Styling for UI elements (crosshair, game over screen, level complete messages)
- **JavaScript (ES6)** - Game logic and mechanics

### Development Tools
- **http-server** (v14.1.1) - Local development server
- **Node.js** - Runtime environment for development dependencies

### Architecture
The game follows a modular architecture with separate components:

- `game-state.js` - Centralized game state management (levels, health, ghost tracking)
- `enemy-ai.js` - Enemy behavior and AI logic
- `gun-shoot.js` - Shooting mechanics and hit detection
- `health-system.js` - Health management for player and enemies
- `wall-collision.js` - Collision detection with walls and obstacles
- `jump-controls.js` - Jump mechanics
- `light-flicker.js` - Dynamic lighting effects
- `billboard.js` - Sprite orientation system
- `script.js` - Main initialization and pointer lock setup

### Assets
- Custom textures (walls, gun, ghost sprites)
- Audio assets (background music, gun sound effects)
- 3D environment (planes, boxes for walls and obstacles)

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)
- A modern web browser with WebGL support (Chrome, Firefox, Edge, Safari)

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   git clone https://github.com/Zi-chyne/ite18finalproject.git
   cd "ITE 18 Final Project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install `http-server` as a development dependency.

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This will:
   - Start a local HTTP server on port 8080
   - Automatically open the game in your default browser
   
   Alternatively, you can run http-server manually:
   ```bash
   npx http-server -p 8080 -o
   ```

4. **Play the game**
   - Click on the game window to activate pointer lock
   - Use **WASD** keys to move
   - Use **Space** to jump
   - Move your **mouse** to look around
   - **Left-click** to shoot
   - Eliminate all ghosts to complete the level!

### Alternative Setup (Without npm)

If you prefer not to use npm, you can serve the files using any local web server:
- Python: `python -m http.server 8000`
- PHP: `php -S localhost:8000`
- Any other local web server

Just ensure you access the game via `http://localhost:PORT/index.html` (not `file://` protocol).

## 🎯 Controls

- **W, A, S, D** - Move forward, left, backward, right
- **Space** - Jump
- **Mouse Movement** - Look around (requires pointer lock - click to activate)
- **Left Mouse Button** - Shoot weapon

## 📁 Project Structure

```
ITE 18 Final Project/
├── assets/
│   ├── Backgroud_music.mp3    # Background music
│   ├── Ghost.png               # Ghost sprite texture
│   ├── Gun.png                 # Gun sprite texture
│   ├── Gun_sound.mp3           # Gunshot sound effect
│   └── Walls.png               # Wall texture
├── modules/
│   ├── billboard.js            # Sprite billboarding component
│   ├── enemy-ai.js             # Enemy AI and behavior
│   ├── game-state.js           # Centralized game state
│   ├── gun-shoot.js            # Shooting mechanics
│   ├── health-system.js        # Health management
│   ├── jump-controls.js        # Jump mechanics
│   ├── light-flicker.js        # Lighting effects
│   └── wall-collision.js       # Collision detection
├── index.html                  # Main HTML file
├── script.js                   # Main initialization script
├── package.json                # Project configuration and dependencies
└── README.md                   # This file
```

## 🎨 Game Features Explained

### Enemy System
- Ghosts spawn at the start of each level
- AI-driven behavior: ghosts chase and attack the player when in range
- Each ghost has health that decreases when shot
- Enemy speed increases with level difficulty

### Combat System
- Raycast-based hit detection
- Visual crosshair for aiming
- Sound effects for shooting
- Damage system with health tracking

### Environment
- Enclosed 30x30 unit room with walls, floor, and ceiling
- Box obstacles scattered throughout for cover
- Fog effects for atmosphere
- Multiple light sources including flickering main light

### UI Elements
- Health indicator (top-left in first-person view)
- Ghost health indicator (top-right in first-person view)
- Level complete message
- Game over screen

## Deployment

This project can be deployed to various platforms:

- **Vercel**: Already configured (see `.vercel` folder)

# Team Roles
Zion Andit – Main Developer
  Wrote the main code that makes the game run.
  Created the rules and logic for how the game plays.

Florence Libby Coles – Designer & Support Developer
  Designed the look, style, and visuals of the game.
  Helped program the user interface (menus and buttons).

**Enjoy the game!** Defeat all the ghosts and survive through all 5 levels!

