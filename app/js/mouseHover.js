function fadeIn(obj) {
    let params = {};
    if (obj.material.emissiveIntensity !== maxIntense) {
        params.intense = minIntense;
    } else {
        params.intense = maxIntense;
    }

    TweenLite.to(params, fadeTime, {
        intense: maxIntense,
        ease: Power1.easeOut,
        onUpdate: function () {
        	obj.material.emissiveIntensity = params.intense;
        }
    });
}
function fadeOut(obj) {
    let params = {};
    if (obj.material.emissiveIntensity !== minIntense) {
        params.intense = maxIntense;
    } else {
        params.intense = minIntense;
    }

    TweenLite.to(params, fadeTime, {
        intense: minIntense,
        ease: Power1.easeOut,
        onUpdate: function () {
        	obj.material.emissiveIntensity = params.intense;
        }
    });
}

function mouseHover() {
    if (scene) {
        camera.updateMatrixWorld();

        // find intersections
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(brainModel.brainGroup.children, true);

        if (intersects.length > 0) {

            if (INTERSECTED != intersects[0].object) {
                if (INTERSECTED) {
                    // To reset after changing hover object
                    if (!INTERSECTED.selected) {
                        // INTERSECTED.material.emissiveIntensity = 0;
                        fadeOut(INTERSECTED);
                        // Balls reset
                        if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
                            // brainModel.brain[4].material.emissiveIntensity = 0;
                            // brainModel.brain[5].material.emissiveIntensity = 0;
                            fadeOut(brainModel.brain[4]);
                            fadeOut(brainModel.brain[5]);
                        }
                        if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
                            // brainModel.brain[6].material.emissiveIntensity = 0;
                            // brainModel.brain[7].material.emissiveIntensity = 0;
                            fadeOut(brainModel.brain[6]);
                            fadeOut(brainModel.brain[7]);
                        }
                    }
                    currentPart = null;
                }

                INTERSECTED = intersects[0].object;
                // console.log(INTERSECTED.name);
                // Balls union
                if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
                    // brainModel.brain[4].material.emissiveIntensity = 1;
                    // brainModel.brain[5].material.emissiveIntensity = 1;
                    fadeIn(brainModel.brain[4]);
                    fadeIn(brainModel.brain[5]);
                }
                if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
                    // brainModel.brain[6].material.emissiveIntensity = 1;
                    // brainModel.brain[7].material.emissiveIntensity = 1;
                    fadeIn(brainModel.brain[6]);
                    fadeIn(brainModel.brain[7]);
                }
                currentPart = INTERSECTED.name;
                // INTERSECTED.material.emissiveIntensity = 1;
                console.log(INTERSECTED.material.emissiveIntensity);
                if (INTERSECTED.material.emissiveIntensity !== 3) {
                	fadeIn(INTERSECTED);
                }
            }

        } else {
            if (INTERSECTED) {
                if (!INTERSECTED.selected) {
                    // INTERSECTED.material.emissiveIntensity = 0;
                    fadeOut(INTERSECTED);
                    // Balls reset
                    if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
                        // brainModel.brain[4].material.emissiveIntensity = 0;
                        // brainModel.brain[5].material.emissiveIntensity = 0;
                        fadeOut(brainModel.brain[4]);
                        fadeOut(brainModel.brain[5]);
                    }
                    if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
                        // brainModel.brain[6].material.emissiveIntensity = 0;
                        // brainModel.brain[7].material.emissiveIntensity = 0;
                        fadeOut(brainModel.brain[6]);
                        fadeOut(brainModel.brain[7]);
                    }
                }
                currentPart = null;
            }
            INTERSECTED = null;
        }

        renderer.render(scene, camera);
    }

}
