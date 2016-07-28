'use strict';

/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats, spotLight;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS
function init() {
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth,
	    SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45,
	    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
	    NEAR = 0.1,
	    FAR = 20000;
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0, 150, 400);
	camera.lookAt(scene.position);
	// RENDERER
	if (Detector.webgl) renderer = new THREE.WebGLRenderer({
		antialias: false
	});else renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	container = document.getElementById('brain');
	container.appendChild(renderer.domElement);
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({
		charCode: 'm'.charCodeAt(0)
	});
	// CONTROLS
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild(stats.domElement);
	// Spotlight
	spotLight = new THREE.SpotLight(0xffffff, 1);
	var lightHelper;
	spotLight.position.set(15, 50, 35);
	spotLight.castShadow = true;
	spotLight.angle = Math.PI / 4;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 200;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 500;
	lightHelper = new THREE.SpotLightHelper(spotLight);
	scene.add(spotLight);
	scene.add(lightHelper);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture('models/checkerboard.jpg');
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(10, 10);
	var floorMaterial = new THREE.MeshPhongMaterial({
		map: floorTexture,
		side: THREE.DoubleSide
	});
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);
	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
	var skyBoxMaterial = new THREE.MeshBasicMaterial({
		color: 0x9999ff,
		side: THREE.BackSide
	});
	var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
	scene.add(skyBox);
	scene.fog = new THREE.FogExp2(0x9999ff, 0.00125);

	////////////
	// CUSTOM //
	////////////

	// Spheres
	//   Note: a standard flat rectangular image will look distorted,
	//   a "spherical projection" image will look "normal".

	// radius, segmentsWidth, segmentsHeight
	var sphereGeom = new THREE.SphereGeometry(40, 32, 16);

	// var light2 = new THREE.AmbientLight(0x444444);
	var light2 = new THREE.AmbientLight(0xffffff, 0.001);
	scene.add(light2);

	// create a small sphere to show position of light
	var lightbulb = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 8), new THREE.MeshBasicMaterial({
		color: 0xffaa00
	}));
	scene.add(lightbulb);
	// lightbulb.position = light.position;

	// Cubes
	//   Note: when using a single image, it will appear on each of the faces.
	//   Six different images (one per face) may be used if desired.

	var cubeGeometry = new THREE.CubeGeometry(85, 85, 85);

	var crateTexture = new THREE.ImageUtils.loadTexture('models/brick.jpg');
	var crateMaterial = new THREE.MeshBasicMaterial({
		map: crateTexture
	});
	var crate = new THREE.Mesh(cubeGeometry.clone(), crateMaterial);
	crate.position.set(-60, 50, -100);
	// scene.add(crate);


	// My model loader
	// Load mesh
	new THREE.JSONLoader().load('models/brain.json', addModel);
}

function addModel(geometry, materials) {
	/*var material = new THREE.MeshBasicMaterial({
 	map: new THREE.ImageUtils.loadTexture('models/brick.jpg', {}, function () {
 		render();
 	})
 });*/
	// create mesh
	var model, mesh, texture;
	materials[0].color = { r: 1, g: 0.5, b: 0.5 };
	materials[1].color = { r: 1, g: 1, b: 0 };
	materials[2].color = { r: 0, g: 1, b: 1 };
	materials[3].color = { r: 0, g: 1, b: 0 };
	materials[4].color = { r: 0.6, g: 1, b: 0 };
	var material = new THREE.MultiMaterial(materials);
	console.log(material);
	model = new THREE.Mesh(geometry, material);
	model.scale.set(0.2, 0.2, 0.2);
	model.position.set(0, 20, -50);
	model.rotation.set(-1.6, 0, 0);
	model.castShadow = true;
	model.receiveShadow = true;
	scene.add(model);
	// look at mesh
	var _model$position = model.position;
	var x = _model$position.x;
	var y = _model$position.y;
	var z = _model$position.z;

	camera.lookAt(0, 0, 0);
	spotLight.target = model;
}

function animate() {
	requestAnimationFrame(animate);
	render();
	update();
}

function update() {
	if (keyboard.pressed("z")) {
		// do something
	}

	controls.update();
	stats.update();
}

function render() {
	renderer.render(scene, camera);
}
//# sourceMappingURL=../js/app.js.map