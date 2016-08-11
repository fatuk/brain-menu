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

		var intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length > 0) {

			if (INTERSECTED != intersects[0].object) {

				if (INTERSECTED) {
					INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
				}

				INTERSECTED = intersects[0].object;
				INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				INTERSECTED.material.emissive.setHex(0xff0000);

			}

		} else {
			if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			INTERSECTED = null;
		}

		renderer.render(scene, camera);
	}

}
