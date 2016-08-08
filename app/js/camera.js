function cameraInit() {
	camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
	camera.position.x = -0.26;
	camera.position.y = 1;
	camera.position.z = 10.85;
	scene.add(camera);
}
