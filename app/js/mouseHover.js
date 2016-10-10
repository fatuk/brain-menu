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
						INTERSECTED.material.emissiveIntensity = 0;
							// Balls reset
						if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
							brainModel.brain[4].material.emissiveIntensity = 0;
							brainModel.brain[5].material.emissiveIntensity = 0;
						}
						if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
							brainModel.brain[6].material.emissiveIntensity = 0;
							brainModel.brain[7].material.emissiveIntensity = 0;
						}
						/*fadeMe = {
							obj: INTERSECTED,
							start: 2,
							end: 0,
							speed: -0.2
						}*/
					}
					currentPart = null;
				}

				INTERSECTED = intersects[0].object;
				// console.log(INTERSECTED.name);
				// Balls union
				if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
					// brainModel.brain[4].material.emissiveIntensity = 1;
					// brainModel.brain[5].material.emissiveIntensity = 1;
					fadeMe = {
						obj: [brainModel.brain[4], brainModel.brain[5]],
						start: 0,
						end: 2,
						speed: 0.1
					}
				}
				if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
					// brainModel.brain[6].material.emissiveIntensity = 1;
					// brainModel.brain[7].material.emissiveIntensity = 1;
					fadeMe = {
						obj: [brainModel.brain[6], brainModel.brain[7]],
						start: 0,
						end: 2,
						speed: 0.1
					}
				}
				currentPart = INTERSECTED.name;
				// INTERSECTED.material.emissiveIntensity = 1;
				fadeMe = {
					obj: INTERSECTED,
					start: 0,
					end: 2,
					speed: 0.1
				}
			}

		} else {
			if (INTERSECTED) {
				if (!INTERSECTED.selected) {
					// INTERSECTED.material.emissiveIntensity = 0;
					// Balls reset
					if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
						// brainModel.brain[4].material.emissiveIntensity = 0;
						// brainModel.brain[5].material.emissiveIntensity = 0;
						fadeMe = {
							obj: [brainModel.brain[4], brainModel.brain[5]],
							start: 2,
							end: 0,
							speed: -0.1
						}
					}
					if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
						// brainModel.brain[6].material.emissiveIntensity = 0;
						// brainModel.brain[7].material.emissiveIntensity = 0;
						fadeMe = {
							obj: [brainModel.brain[6], brainModel.brain[7]],
							start: 2,
							end: 0,
							speed: -0.1
						}
					}
					fadeMe = {
						obj: INTERSECTED,
						start: 2,
						end: 0,
						speed: -0.1
					}
				}
				currentPart = null;
			}
			INTERSECTED = null;
		}

		renderer.render(scene, camera);
	}

}
