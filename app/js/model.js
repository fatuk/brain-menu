function modelInit() {
	let loader = new THREE.JSONLoader();
	loader.load('models/2_brain1-3.json', (geometry, materials) => {
		material = new THREE.MultiMaterial(materials);
		material.wireframe = true;
		// material = new THREE.MeshLambertMaterial();
		mesh = new THREE.Mesh(geometry, material);
		mesh.geometry.verticesNeedUpdate = true;
		mesh.geometry.normalsNeedUpdate = true;
		mesh.geometry.computeBoundingSphere();
		mesh.geometry.computeFaceNormals();
		mesh.geometry.computeVertexNormals();
		mesh.position.set(0, 0, 0);
		mesh.scale.set(1, 1, 1);
		scene.add(mesh);
	});

	/*geometry = new THREE.CubeGeometry(100, 100, 100);
	material = new THREE.MeshPhongMaterial();
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);*/
}
