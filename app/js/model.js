function modelInit() {
	let XHRLoader = new THREE.XHRLoader();
	let jsonUrl = 'models/app-brain.json';

	XHRLoader.load(jsonUrl, function (text) {
		let json = JSON.parse(text);

		let loader = new THREE.ObjectLoader();

		scene = loader.parse(json.scene);
		cameraInit();
		mesh = scene.children[3];
		mesh.rotation.z = 0.1;
	});
}
