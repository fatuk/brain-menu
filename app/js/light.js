function lightInit () {
	spotLight = new THREE.SpotLight(0xffffff, 2);
	spotLight.position.set(0, 50, 250);
	spotLight.castShadow = true;
	spotLight.angle = Math.PI / 4;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 350;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 500;
	lightHelper = new THREE.SpotLightHelper(spotLight);
	scene.add(spotLight);
	scene.add(lightHelper);
}
