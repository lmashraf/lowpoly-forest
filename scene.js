import { initAnimations } from './animation.js';

export function initScene() {
    console.log('Initializing scene...');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x303030); // Set background to grey color

    return scene;
}

export function loadScene(scene, mixers) {
    console.log('Loading scene...');

    const loader = new THREE.GLTFLoader();
    loader.load('assets/scene.glb', (gltf) => {
        console.log('Scene loaded');
        scene.add(gltf.scene);
        initAnimations(gltf.scene, mixers);
    }, undefined, (error) => {
        console.error('Error loading scene:', error);
    });
}
