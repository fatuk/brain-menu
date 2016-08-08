function lines() {
	var material = new THREE.LineBasicMaterial({
		color: 0x8e7f78
	});

	var geometry = new THREE.Geometry();
/*	geometry.vertices.push(
		new THREE.Vector3(-10, 1, 0),
		new THREE.Vector3(0, 0, 0)
	);*/

	lineServices = new THREE.Line(geometry, material);
	lineServices.geometry.vertices = [
		new THREE.Vector3(-10, 1, 0),
		new THREE.Vector3(0, 0, 0)
	];

	lineContacts = new THREE.Line(geometry.clone(), material);
	lineContacts.geometry.vertices = [
		new THREE.Vector3(0, -10, 0),
		new THREE.Vector3(0, 0, 0)
	];

	lineAbout = new THREE.Line(geometry.clone(), material);
	lineAbout.geometry.vertices = [
		new THREE.Vector3(10, 0, 0),
		new THREE.Vector3(0, 0, 0)
	];

	lineProjects = new THREE.Line(geometry.clone(), material);
	lineProjects.geometry.vertices = [
		new THREE.Vector3(0, 10, 0),
		new THREE.Vector3(0, 0, 0)
	];

	scene.add(lineServices);
	scene.add(lineContacts);
	scene.add(lineAbout);
	scene.add(lineProjects);
}
