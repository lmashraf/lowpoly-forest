import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

export function initAnimations(scene, mixers) {
    console.log('Initializing animations...');
    scene.traverse((node) => {
        if (node.isObject3D && node.name.includes('Tree')) {
            console.log(`Found tree group: ${node.name}`);
            createTreeSwayAnimation(node, mixers);
        } else if (node.isMesh && node.name.includes('Mushroom')) {
            console.log(`Found mushroom: ${node.name}`);
            createMushroomPopAnimation(node, mixers);
        }
    });
}

export function createTreeSwayAnimation(treeGroup, mixers) {
    console.log(`Creating tree sway animation for: ${treeGroup.name}`);

    let swayKeyframes;
    if (treeGroup.name === "TreeGreen") {
        swayKeyframes = new THREE.AnimationClip('sway', -1, [
            new THREE.VectorKeyframeTrack(`${treeGroup.uuid}.rotation[z]`, [0, 3, 6], [0, 0.09, 0])
        ]);
    } else {
        swayKeyframes = new THREE.AnimationClip('sway', -1, [
            new THREE.VectorKeyframeTrack(`${treeGroup.uuid}.rotation[z]`, [0, 3, 6], [0, -0.09, 0])
        ]);
    }

    const mixer = new THREE.AnimationMixer(treeGroup);
    mixers.push(mixer);
    const action = mixer.clipAction(swayKeyframes);
    action.setLoop(THREE.LoopRepeat);
    action.play();
    console.log(`Tree sway animation created for: ${treeGroup.name}`);
}

export function createMushroomPopAnimation(mushroom, mixers) {
    console.log(`Creating mushroom pop animation for: ${mushroom.name}`);
    const popKeyframes = new THREE.AnimationClip('pop', -1, [
        new THREE.VectorKeyframeTrack(`${mushroom.uuid}.position[y]`, [0, 2, 4], [mushroom.position.y, mushroom.position.y + 0.2, mushroom.position.y])
    ]);
    const mixer = new THREE.AnimationMixer(mushroom);
    mixers.push(mixer);
    const action = mixer.clipAction(popKeyframes);
    action.setLoop(THREE.LoopRepeat);
    action.play();
    console.log(`Mushroom pop animation created for: ${mushroom.name}`);
}

export function updateAnimations(mixers, delta) {
    mixers.forEach((mixer) => mixer.update(delta));
}
