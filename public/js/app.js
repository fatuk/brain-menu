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
    pivot = void 0,
    spotLight = void 0,
    directLight1 = void 0,
    directLight2 = void 0,
    ambientLight = void 0,
    lightHelper1 = void 0,
    lineServices = void 0,
    lineProjects = void 0,
    lineAbout = void 0,
    lineContacts = void 0,
    lightHelper2 = void 0;
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
	// scene = new THREE.Scene();

	// lightInit();
	modelInit();
	// lines();

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: false
	});
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
	camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
	camera.position.x = -0.26;
	camera.position.y = 1;
	camera.position.z = 10.85;
	scene.add(camera);
}
"use strict";

function lightInit() {
	// Ambient light
	ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
	// Spotlight
	directLight1 = new THREE.DirectionalLight(0xffffff, 2);
	directLight2 = new THREE.DirectionalLight(0xffffff);
	directLight1.position.set(5, 10, 7.5);
	directLight2.position.set(5, 10, -7.5);
	// Light helper
	lightHelper1 = new THREE.DirectionalLightHelper(directLight1);
	lightHelper2 = new THREE.DirectionalLightHelper(directLight2);
	scene.add(ambientLight);
	scene.add(directLight1);
	// scene.add(directLight2);
	// scene.add(lightHelper1);
	// scene.add(lightHelper2);
}
"use strict";

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
	lineServices.geometry.vertices = [new THREE.Vector3(-10, 1, 0), new THREE.Vector3(0, 0, 0)];

	lineContacts = new THREE.Line(geometry.clone(), material);
	lineContacts.geometry.vertices = [
	// new THREE.Vector3(0, -10, 0),
	new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 0, 0)];

	lineAbout = new THREE.Line(geometry.clone(), material);
	lineAbout.geometry.vertices = [new THREE.Vector3(10, 0, 0), new THREE.Vector3(0, 0, 0)];

	lineProjects = new THREE.Line(geometry.clone(), material);
	lineProjects.geometry.vertices = [new THREE.Vector3(0, 10, 0), new THREE.Vector3(0, 0, 0)];

	scene.add(lineServices);
	scene.add(lineContacts);
	scene.add(lineAbout);
	scene.add(lineProjects);
}
'use strict';

function loadProgress(loading) {

	console.log(loading);

	var $progressContainer = document.getElementsByClassName('js-loader')[0];
	var total = loading.total;
	var loaded = loading.loaded;
	var loadedPercents = Math.round(loaded / total * 100);

	$progressContainer.textContent = loadedPercents + ' %';

	if (loadedPercents === 100) {
		$progressContainer.className = 'hide';
	}
}
'use strict';

function modelInit() {
	var XHRLoader = new THREE.XHRLoader();
	var jsonUrl = 'models/app.json';

	XHRLoader.load(jsonUrl, function (text) {
		var json = JSON.parse(text);

		var loader = new THREE.ObjectLoader();

		scene = loader.parse(json.scene);
		cameraInit();
		mesh = scene.children[3];
		mesh.rotation.z = 0.1;
	}, loadProgress);
}
"use strict";

function render() {
	if (mesh) {
		// mesh.rotation.y += 0.1;
		// mesh.rotation.z = 0.1;
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

		/*var vectorServices = mesh.geometry.vertices[500].clone();
  vectorServices.applyMatrix4(mesh.matrixWorld);
  lineServices.geometry.vertices[1] = vectorServices;
  lineServices.geometry.verticesNeedUpdate = true;
  	var vectorContacts = mesh.geometry.vertices[100].clone();
  vectorContacts.applyMatrix4(mesh.matrixWorld);
  lineContacts.geometry.vertices[1] = vectorContacts;
  lineContacts.geometry.verticesNeedUpdate = true;
  	var vectorProjects = mesh.geometry.vertices[2000].clone();
  vectorProjects.applyMatrix4(mesh.matrixWorld);
  lineProjects.geometry.vertices[1] = vectorProjects;
  lineProjects.geometry.verticesNeedUpdate = true;
  	var vectorAbout = mesh.geometry.vertices[1000].clone();
  vectorAbout.applyMatrix4(mesh.matrixWorld);
  lineAbout.geometry.vertices[1] = vectorAbout;
  lineAbout.geometry.verticesNeedUpdate = true;*/
	}

	if (scene) {
		renderer.render(scene, camera);
	}
}
//# sourceMappingURL=../js/app.js.map