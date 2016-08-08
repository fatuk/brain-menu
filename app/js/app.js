let camera,
	scene,
	renderer,
	geometry,
	material,
	mesh,
	spotLight,
	directLight1,
	directLight2,
	ambientLight,
	lightHelper1,
	lineServices,
	lineProjects,
	lineAbout,
	lineContacts,
	lightHelper2;
let angle = 0;
let width = window.innerWidth;
let height = window.innerHeight;

let targetRotationX = 0;
let targetRotationOnMouseDownX = 0;

let targetRotationY = 0;
let targetRotationOnMouseDownY = 0;

let mouseX = 0;
let mouseXOnMouseDown = 0;

let mouseY = 0;
let mouseYOnMouseDown = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let finalRotationY;
const ROTATION_BOUNCE = 0.05;
const MOUSE_ROTATION_SPEED = 0.008;
const TOUCH_ROTATION_SPEED = 0.008;

init();
animate();

function init() {
	scene = new THREE.Scene();

	cameraInit();
	lightInit();
	modelInit();
	lines();

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
