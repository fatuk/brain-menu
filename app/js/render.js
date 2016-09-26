function render() {
	if (mesh) {
		// debugger;
		// G1
		brainModel.gearsGroup[0].rotation.z += 0.015 / 4;
		// G2
		// brainModel.gearsGroup[1].rotation.z -= 0.05 / 4;
		// G3
		brainModel.gearsGroup[4].rotation.z -= 0.02 / 4;
		// G4
		brainModel.gearsGroup[2].rotation.z += 0.05 / 4;
		// G5
		brainModel.gearsGroup[3].rotation.z += 0.05 / 4;

		mesh.rotation.y += (targetRotationX - mesh.rotation.y) * ROTATION_BOUNCE;

		// Rotation info
		$rotationInfoX.textContent = Math.round(mesh.rotation.x * 100) / 100;
		$rotationInfoY.textContent = Math.round(mesh.rotation.y * 100) / 100;

		finalRotationY = (targetRotationY - mesh.rotation.x);
		if (mesh.rotation.x <= 1 && mesh.rotation.x >= -1) {
			mesh.rotation.x += finalRotationY * ROTATION_BOUNCE;
		}
		// Max
		if (mesh.rotation.x > 1) {
			mesh.rotation.x = 1;
		}
		// Min
		if (mesh.rotation.x < -0.5) {
			mesh.rotation.x = -0.5;
		}



		/*var vectorServices = mesh.geometry.vertices[500].clone();
		vectorServices.applyMatrix4(mesh.matrixWorld);
		lineServices.geometry.vertices[1] = vectorServices;
		lineServices.geometry.verticesNeedUpdate = true;

		var vectorContacts = mesh.geometry.vertices[100].clone();
		vectorContacts.applyMatrix4(mesh.matrixWorld);
		lineContacts.geometry.vertices[1] = vectorContacts;
		lineContacts.geometry.verticesNeedUpdate = true;

		var vectorProjects = mesh.geometry.vertices[2000].clone();
		vectorProjects.applyMatrix4(mesh.matrixWorld);
		lineProjects.geometry.vertices[1] = vectorProjects;
		lineProjects.geometry.verticesNeedUpdate = true;

		var vectorAbout = mesh.geometry.vertices[1000].clone();
		vectorAbout.applyMatrix4(mesh.matrixWorld);
		lineAbout.geometry.vertices[1] = vectorAbout;
		lineAbout.geometry.verticesNeedUpdate = true;*/


	}

	if (scene) {
		renderer.render(scene, camera);
	}
}
