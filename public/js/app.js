'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var renderer = new THREE.WebGLRenderer();

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

var scene = new THREE.Scene();

var matFloor = new THREE.MeshPhongMaterial();
var matBox = new THREE.MeshPhongMaterial({
	color: 0x4080ff
});

var geoFloor = new THREE.BoxGeometry(2000, 1, 2000);
var geoBox = new THREE.BoxGeometry(3, 1, 2);

var mshFloor = new THREE.Mesh(geoFloor, matFloor);
var mshBox = new THREE.Mesh(geoBox, matBox);

var ambient = new THREE.AmbientLight(0xffffff, 0.1);

var spotLight = new THREE.SpotLight(0xffffff, 1);
var lightHelper;

var gui,
    guiElements,
    param = {
	color: '0xffffff'
};
// Load mesh
var model, mesh, texture;
new THREE.JSONLoader().load('models/model.json', function (geometry) {
	var modelTextureLoader = new THREE.TextureLoader();
	modelTextureLoader.load('models/flawless-brick-tile-wx6341.jpg', function (texture) {
		var material = new THREE.MeshLambertMaterial({
			map: texture
		});
		// create mesh
		model = new THREE.Mesh(geometry, material);
		model.scale.set(10, 10, 10);
		model.castShadow = true;
		scene.add(model);
		// look at mesh
		camera.lookAt(model.position);
		spotLight.target = model;
		console.log(model.position);

		// start render loop
		render();
	});
});
// var jsonLoader = new THREE.JSONLoader();
// jsonLoader.load('models/model.json', (geometry, materials) => {
// 	var material = new THREE.MeshFaceMaterial(materials);
// 	model = new THREE.Mesh(geometry, material);
// 	model.scale.set(1, 1, 1);
// 	model.castShadow = true;
// 	console.log(model);
// 	model.position.set(40, 1.8, 0);
// 	scene.add(model);
// 	render();
// });

// Stats
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function init() {

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	camera.position.set(65, 8, -10);

	spotLight.position.set(15, 40, 35);
	spotLight.castShadow = true;
	spotLight.angle = Math.PI / 4;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 200;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 200;

	lightHelper = new THREE.SpotLightHelper(spotLight);

	matFloor.color.set(0x808080);

	mshFloor.receiveShadow = true;
	mshFloor.position.set(0, -0.05, 0);

	mshBox.castShadow = true;
	mshBox.position.set(40, 1.8, 0);

	scene.add(camera);
	scene.add(mshFloor);
	// scene.add(mshBox);
	scene.add(ambient);
	scene.add(spotLight);
	scene.add(new THREE.AxisHelper(10));
	scene.add(lightHelper);

	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);

	controls.addEventListener('change', render);
	controls.minDistance = 20;
	controls.maxDistance = 500;
	controls.maxPolarAngle = Math.PI / 2;
	controls.enablePan = false;
	controls.target.copy(mshBox.position);
	controls.update();

	window.addEventListener('resize', onResize, false);
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function render() {
	stats.begin();
	lightHelper.update(); // required
	renderer.render(scene, camera);
	stats.end();
}

function clearGui() {

	if (gui) gui.destroy();

	gui = new dat.GUI();

	gui.open();
}

function buildGui() {

	clearGui();

	addGui('light color', spotLight.color.getHex(), function (val) {

		spotLight.color.setHex(val);
		render();
	}, true);

	addGui('intensity', spotLight.intensity, function (val) {

		spotLight.intensity = val;
		render();
	}, false, 0, 2);

	addGui('distance', spotLight.distance, function (val) {

		spotLight.distance = val;
		render();
	}, false, 0, 200);

	addGui('angle', spotLight.angle, function (val) {

		spotLight.angle = val;
		render();
	}, false, 0, Math.PI / 3);

	addGui('penumbra', spotLight.penumbra, function (val) {

		spotLight.penumbra = val;
		render();
	}, false, 0, 1);

	addGui('decay', spotLight.decay, function (val) {

		spotLight.decay = val;
		render();
	}, false, 1, 2);
}

function addGui(name, value, callback, isColor, min, max) {

	var node;
	param[name] = value;

	if (isColor) {

		node = gui.addColor(param, name).onChange(function () {

			callback(param[name]);
		});
	} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {

		node = gui.add(param, name, value).onChange(function () {

			callback(param[name]);
		});
	} else {

		node = gui.add(param, name, min, max).onChange(function () {

			callback(param[name]);
		});
	}

	return node;
}

init();

buildGui();

render();
//# sourceMappingURL=../js/app.js.map