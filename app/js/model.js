function modelInit() {
	let loader = new THREE.JSONLoader();
	loader.load('models/brain.json', (geometry, materials) => {
		material = new THREE.MultiMaterial(materials);
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
	});
	/*geometry = new THREE.CubeGeometry(100, 100, 100);
	material = new THREE.MeshPhongMaterial({
		color: 0xfff000,
		wireframe: false
	});

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);*/
}
