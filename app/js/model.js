function modelInit() {
	let loader = new THREE.JSONLoader();
	loader.load('models/2_brain1-3.json', (geometry, materials) => {
		material = new THREE.MultiMaterial(materials);
		// material = new THREE.MeshLambertMaterial();
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, -50, -100);
		mesh.scale.set(70, 70, 70);
		scene.add(mesh);
	});

	/*geometry = new THREE.CubeGeometry(100, 100, 100);
	material = new THREE.MeshPhongMaterial();
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);*/
}
