function cameraInit() {
	camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	camera.position.z = 500;
	scene.add(camera);
}
