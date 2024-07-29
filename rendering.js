export function initRenderer() {
    console.log('Initializing renderer...');

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    document.body.appendChild(renderer.domElement);

    return renderer;
}

export function renderScene(renderer, scene, camera) {
    renderer.render(scene, camera);
}
