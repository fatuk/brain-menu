"use strict";

function animate() {
	requestAnimationFrame(animate);
	render();
}
'use strict';

var camera = void 0,
    scene = void 0,
    renderer = void 0,
    geometry = void 0,
    material = void 0,
    mesh = void 0,
    spotLight = void 0,
    ambientLight = void 0,
    lightHelper = void 0;
var angle = 0;
var width = window.innerWidth;
var height = window.innerHeight;

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var finalRotationY = void 0;
var ROTATION_BOUNCE = 0.05;
var MOUSE_ROTATION_SPEED = 0.008;
var TOUCH_ROTATION_SPEED = 0.008;

init();
animate();

function init() {
	scene = new THREE.Scene();

	cameraInit();
	lightInit();
	modelInit();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onWindowResize, false);
}
'use strict';

function onWindowResize() {
	width = window.innerWidth;
	height = window.innerHeight;
	windowHalfX = width / 2;
	windowHalfY = height / 2;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

function onDocumentMouseDown(event) {
	event.preventDefault();
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	document.addEventListener('mouseout', onDocumentMouseOut, false);
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDownX = targetRotationX;
	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetRotationOnMouseDownY = targetRotationY;
}

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
	targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * MOUSE_ROTATION_SPEED;
	targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * MOUSE_ROTATION_SPEED;
}

function onDocumentMouseUp(event) {
	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
	document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
	document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
		targetRotationOnMouseDownX = targetRotationX;
		mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;
		targetRotationOnMouseDownY = targetRotationY;
	}
}

function onDocumentTouchMove(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mouseX = event.touches[0].pageX - windowHalfX;
		targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * TOUCH_ROTATION_SPEED;
		mouseY = event.touches[0].pageY - windowHalfY;
		targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * TOUCH_ROTATION_SPEED;
	}
}
"use strict";

function cameraInit() {
	camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	camera.position.z = 500;
	scene.add(camera);
}
"use strict";

function lightInit() {
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
'use strict';

function modelInit() {
	var loader = new THREE.JSONLoader();
	loader.load('models/2_brain1-3.json', function (geometry, materials) {
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
"use strict";

function render() {
	if (mesh) {
		mesh.rotation.y += (targetRotationX - mesh.rotation.y) * ROTATION_BOUNCE;

		finalRotationY = targetRotationY - mesh.rotation.x;
		if (mesh.rotation.x <= 1 && mesh.rotation.x >= -1) {
			mesh.rotation.x += finalRotationY * ROTATION_BOUNCE;
		}
		// Max
		if (mesh.rotation.x > 1) {
			mesh.rotation.x = 1;
		}
		// Min
		if (mesh.rotation.x < -0.5) {
			mesh.rotation.x = -0.5;
		}
	}
	renderer.render(scene, camera);
}
//# sourceMappingURL=../js/app.js.map