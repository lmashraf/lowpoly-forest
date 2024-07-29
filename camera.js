export function initCamera() {
    console.log('Initializing camera...');

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Camera position closer to the scene
    camera.position.set(0, 3, 5);
    // Camera is looking at the center of the scene
    camera.lookAt(0, 1, 0);

    return camera;
}

export function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
