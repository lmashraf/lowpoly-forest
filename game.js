import { initScene, loadScene } from './scene.js';
import { initCamera, onWindowResize } from './camera.js';
import { initLights } from './lighting.js';
import { initAnimations, updateAnimations } from './animation.js';
import { initRenderer, renderScene } from './rendering.js';

class Game {
    constructor() {
        this.parallaxAmount = 0.3;
        this.clock = new THREE.Clock();
        this.mixers = [];
        console.log('Game initialized');
        this.init();
        this.startGameLoop();
        window.addEventListener('resize', () => onWindowResize(this.camera, this.renderer));
    }

    init() {
        console.log('Initializing...');
        this.scene = initScene();
        this.camera = initCamera();
        this.renderer = initRenderer();
        initLights(this.scene);
        loadScene(this.scene, this.mixers);
    }

    update(delta) {
        // Update
        if (this.scene) {
            this.scene.rotation.y += 0.0005;
        }

        // Update animations
        updateAnimations(this.mixers, delta);

        // Move camera left and right
        const time = Date.now() * 0.0002;
        this.camera.position.x = Math.sin(time) * this.parallaxAmount;
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
    }

    render() {
        // Render
        renderScene(this.renderer, this.scene, this.camera);
    }

    gameLoop() {
        requestAnimationFrame(() => this.gameLoop());

        const delta = this.clock.getDelta();
        this.update(delta);
        this.render();
    }

    startGameLoop() {
        this.clock.start();
        this.gameLoop();
    }
}

// Initialise the game app
const game = new Game();
