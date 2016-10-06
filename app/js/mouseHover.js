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
						resetSelection();
					}
					currentPart = null;
				}

				INTERSECTED = intersects[0].object;
				console.log(INTERSECTED.name);
				// Balls union
				if (INTERSECTED.name === 'o-brain-5_1' || INTERSECTED.name === 'o-brain-5_2') {
					brainModel.brain[4].material.emissiveIntensity = 1;
					brainModel.brain[5].material.emissiveIntensity = 1;
				}
				if (INTERSECTED.name === 'o-brain-6_1' || INTERSECTED.name === 'o-brain-6_2') {
					brainModel.brain[6].material.emissiveIntensity = 1;
					brainModel.brain[7].material.emissiveIntensity = 1;
				}
				currentPart = INTERSECTED.name;
				INTERSECTED.material.emissiveIntensity = 1;
			}

		} else {
			if (INTERSECTED) {
				if (!INTERSECTED.selected) {
					resetSelection();
				}
				currentPart = null;
			}
			INTERSECTED = null;
		}

		renderer.render(scene, camera);
	}

}
