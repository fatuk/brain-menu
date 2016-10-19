function render() {
	if (mesh) {
		// G1
		brainModel.gearsGroup[0].rotation.z += 0.015 / 4;
		// G2
		brainModel.gearsGroup[1].rotation.z -= 0.05 / 4;
		// G3
		brainModel.gearsGroup[4].rotation.z -= 0.02 / 4;
		// G4
		brainModel.gearsGroup[2].rotation.z += 0.05 / 4;
		// G5
		brainModel.gearsGroup[3].rotation.z -= 0.05 / 4;

		let prevAngle = mesh.rotation.y;

		mesh.rotation.y += (targetRotationX - mesh.rotation.y) * ROTATION_BOUNCE;


		let prevRot = Math.floor(prevAngle * 100) / 100;
		let currentRot = Math.floor(mesh.rotation.y * 100) / 100;
		if (prevRot === currentRot) {
			isMoving = false;
		}

		if (isMoving) {
			resetSelection();
			resetIntense();
			resetFlames();
			myHint.close();
		}

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

	}

	if (scene) {
		renderer.render(scene, camera);
	}
}
