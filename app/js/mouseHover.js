function mouseHover() {
	if (scene) {
		camera.updateMatrixWorld();

		// find intersections
		raycaster.setFromCamera(mouse, camera);

		var intersects = raycaster.intersectObjects(brainModel.brainGroup.children, true);

		if (intersects.length > 0) {

			if (INTERSECTED != intersects[0].object) {
				/*switch (intersects[0].object.name) {
					case 'o-brain-1':
						brainModel.flames.children[0].visible = true;
						break;
					case 'o-brain-2':
						brainModel.flames.children[1].visible = true;
						break;
					case 'o-brain-3':
						brainModel.flames.children[2].visible = true;
						break;
					case 'o-brain-4':
						brainModel.flames.children[3].visible = true;
						break;
					case 'o-brain-5_1':
						brainModel.flames.children[4].visible = true;
						break;
					case 'o-brain-5_2':
						brainModel.flames.children[5].visible = true;
						break;
					case 'o-brain-6_1':
						brainModel.flames.children[5].visible = true;
						break;
					case 'o-brain-6_2':
						brainModel.flames.children[5].visible = true;
						break;
					case 'o-brain-7':
						brainModel.flames.children[6].visible = true;
						break;
				}*/

				if (INTERSECTED) {
					// To reset after changing hover object
					if (!INTERSECTED.selected) {
						INTERSECTED.material.emissiveIntensity = 0;
					}
					currentPart = null;
				}

				INTERSECTED = intersects[0].object;
				// console.log(INTERSECTED.name);
				currentPart = INTERSECTED.name;
				INTERSECTED.material.emissiveIntensity = 1;
			}

		} else {
			if (INTERSECTED) {
				if (!INTERSECTED.selected) {
					INTERSECTED.material.emissiveIntensity = 0;
				}
				currentPart = null;
			}
			INTERSECTED = null;
		}

		renderer.render(scene, camera);
	}

}
