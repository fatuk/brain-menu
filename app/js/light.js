function lightInit () {
	// Ambient light
	ambientLight = new THREE.AmbientLight(0x222222);
	// Spotlight
	spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(0, 70, 250);
	spotLight.castShadow = false;
	spotLight.angle = Math.PI / 1;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.intensity = 7;
	spotLight.distance = 450;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 500;
	// Light helper
	lightHelper = new THREE.SpotLightHelper(spotLight);
	scene.add(ambientLight);
	scene.add(spotLight);
	scene.add(lightHelper);
}
