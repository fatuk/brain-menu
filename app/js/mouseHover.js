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

		var intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length > 0) {

			if (INTERSECTED != intersects[0].object) {

				if (INTERSECTED) {
					console.log(INTERSECTED.name);
					INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
					INTERSECTED.material.emissiveIntensity = 0;
				}

				INTERSECTED = intersects[0].object;
				INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				INTERSECTED.material.emissive.setHex(0xCC0000);
				INTERSECTED.material.emissiveIntensity = 0.2;

			}

		} else {
			if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			INTERSECTED = null;
		}

		renderer.render(scene, camera);
	}

}
