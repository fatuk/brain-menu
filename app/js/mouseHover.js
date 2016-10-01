function mouseHover() {


	// var intersects = raycaster.intersectObjects( scene.children[3].children );
	if (scene) {
		camera.updateMatrixWorld();

		/*scene.children[3].children[0].position.x += 0.01;
		scene.children[3].children[1].position.x += -0.01;
		scene.children[3].children[2].position.y += 0.01;
		scene.children[3].children[3].position.z += 0.01;*/
		// find intersections
		raycaster.setFromCamera(mouse, camera);

		// console.log(scene.children[1].children[0].children);

		// var intersects = raycaster.intersectObjects(scene.children, true);
		var intersects = raycaster.intersectObjects(brainModel.brainGroup.children, true);

		if (intersects.length > 0) {

			if (INTERSECTED != intersects[0].object) {
				switch (intersects[0].object.name) {
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
				}

				if (INTERSECTED) {
					// console.log(INTERSECTED.name);
					// console.log(brainModel.brainGroup.children);
					INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
					INTERSECTED.material.emissiveIntensity = 0;
				}

				INTERSECTED = intersects[0].object;
				// INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				// INTERSECTED.material.emissive.setHex(0xCC0000);
				// INTERSECTED.material.emissiveIntensity = 0.2;

				// brainModel.flames.children[0].visible = true;

			}

		} else {
			brainModel.flames.children[0].visible = false;
			brainModel.flames.children[1].visible = false;
			brainModel.flames.children[2].visible = false;
			brainModel.flames.children[3].visible = false;
			brainModel.flames.children[4].visible = false;
			brainModel.flames.children[5].visible = false;
			brainModel.flames.children[6].visible = false;
			if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			INTERSECTED = null;
		}

		renderer.render(scene, camera);
	}

}
