'use strict';

var camera = void 0,
    scene = void 0,
    renderer = void 0,
    geometry = void 0,
    material = void 0,
    mesh = void 0;
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

	camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	camera.position.z = 1000;
	scene.add(camera);

	geometry = new THREE.CubeGeometry(200, 200, 200);
	material = new THREE.MeshBasicMaterial({
		color: 0xfff000,
		wireframe: true
	});

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
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

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
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
	renderer.render(scene, camera);
}
//# sourceMappingURL=../js/app.js.map