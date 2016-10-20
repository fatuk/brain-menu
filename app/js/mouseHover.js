function fadeIn(obj, attr, min = 0, max = 2) {
    let params = {};
    if (obj.material[attr] !== max) {
        params.intense = min;
    } else {
        params.intense = max;
    }

    TweenMax.to(params, fadeTime, {
        intense: max,
        ease: Power1.easeOut,
        onUpdate: function() {
            obj.material[attr] = params.intense;
        }
    });
}

function fadeOut(obj, attr, min = 0, max = 2) {
    let params = {};
    if (obj.material[attr] !== min) {
        params.intense = max;
    } else {
        params.intense = min;
    }

    TweenMax.to(params, fadeTime, {
        intense: min,
        ease: Power1.easeOut,
        onUpdate: function() {
            obj.material[attr] = params.intense;
        }
    });
}

function flamePulsing(obj) {
    let params = {
        offset: 0,
        opacity: 1
    };

    TweenMax.to(params, 7, {
        offset: 0.2,
        ease: Power1.easeInOut,
        repeat: -1,
        yoyo: true,
        onUpdate: function() {
            obj.material.map.offset.x = params.offset;
        }
    });

    /*TweenMax.to(params, 10, {
        opacity: 0.3,
        ease: RoughEase.ease.config({
            template: Power0.easeNone,
            strength: 1,
            points: 20,
            taper: 'none',
            randomize: true,
            clamp: false
        }),
        repeat: -1,
        yoyo: true,
        onUpdate: function () {
            obj.material.opacity = params.opacity;
        }
    });*/
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
                        fadeOut(INTERSECTED, 'emissiveIntensity');
                        // Balls reset
                        if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
                            fadeOut(brainModel.brain[4], 'emissiveIntensity');
                            fadeOut(brainModel.brain[5], 'emissiveIntensity');
                        }
                        if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
                            fadeOut(brainModel.brain[6], 'emissiveIntensity');
                            fadeOut(brainModel.brain[7], 'emissiveIntensity');
                        }
                    }
                    isHover = false;
                    currentPart = null;
                }

                INTERSECTED = intersects[0].object;
                // Balls union
                if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
                    fadeIn(brainModel.brain[4], 'emissiveIntensity');
                    fadeIn(brainModel.brain[5], 'emissiveIntensity');
                }
                if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
                    fadeIn(brainModel.brain[6], 'emissiveIntensity');
                    fadeIn(brainModel.brain[7], 'emissiveIntensity');
                }
                currentPart = INTERSECTED.name;
                if (INTERSECTED.material.emissiveIntensity !== maxIntense) {
                    fadeIn(INTERSECTED, 'emissiveIntensity');
                }
                isHover = true;
            }

        } else {
            if (INTERSECTED) {
                if (!INTERSECTED.selected) {
                    fadeOut(INTERSECTED, 'emissiveIntensity');
                    // Balls reset
                    if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
                        fadeOut(brainModel.brain[4], 'emissiveIntensity');
                        fadeOut(brainModel.brain[5], 'emissiveIntensity');
                    }
                    if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
                        fadeOut(brainModel.brain[6], 'emissiveIntensity');
                        fadeOut(brainModel.brain[7], 'emissiveIntensity');
                    }
                }
                isHover = false;
                currentPart = null;
            }
            INTERSECTED = null;
        }

        renderer.render(scene, camera);
    }

}
