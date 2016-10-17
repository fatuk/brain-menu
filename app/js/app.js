let camera,
	scene,
	renderer,
	geometry,
	material,
	mesh,
	pivot,
	spotLight,
	directLight1,
	directLight2,
	ambientLight,
	lightHelper1,
	lineServices,
	lineProjects,
	lineAbout,
	projector,
	INTERSECTED,
	raycaster,
	lineContacts,
	animationLoop,
	lightHelper2,
	myHint,
	myModal;

let currentState = 'about';
// Texture images
let brainTextures = {};

let angle = 0;
let width = window.innerWidth;
let height = window.innerHeight;

let $rotationInfoX = document.getElementsByClassName('js-rotationX')[0];
let $rotationInfoY = document.getElementsByClassName('js-rotationY')[0];

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

let currentPart = null;

let finalRotationY;
const ROTATION_BOUNCE = 0.05;
const MOUSE_ROTATION_SPEED = 0.008;
const TOUCH_ROTATION_SPEED = 0.008;

let mouse = new THREE.Vector2(); // create once
let circleNumber;

// Fade config
let minIntense = 0;
let maxIntense = 3;
let fadeTime = 0.5; // seconds

// Hover config
let isHover = false;
let isMoving = false;

init();
animate();

let fadeMe = {};

// function fade(obj, start, end, speed) {
function fadeIntense(data) {
	var {obj, start, end, speed} = data;

	if (speed > 0) {
		if (obj && obj.material.emissiveIntensity <= end) {
			console.log(obj);
			if (Array.isArray(obj)) {
				console.log(obj);
				obj[0].material.emissiveIntensity += speed;
				obj[1].material.emissiveIntensity += speed;
			} else {
				obj.material.emissiveIntensity += speed;
			}
			// console.log(obj.material.emissiveIntensity);
		}
	} else {
		if (obj && obj.material.emissiveIntensity >= 0) {
			if (Array.isArray(obj)) {
				obj[0].material.emissiveIntensity += speed;
				obj[1].material.emissiveIntensity += speed;
			} else {
				obj.material.emissiveIntensity += speed;
			}
			// console.log(obj.material.emissiveIntensity);
		}
	}
}

function init() {
	raycaster = new THREE.Raycaster(); // create once

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: false
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.sortObjects = false;

	let container = document.getElementById('brain');
	container.appendChild(renderer.domElement);

	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('DOMContentLoaded', onDocumentReady);

	// initialize object to perform world/screen calculations
	projector = new THREE.Projector();

	// when the mouse moves, call the given function
	document.addEventListener('mousemove', onMouseHover, false);

	document.addEventListener('mousedown', function (e) {
		if (e.target.className !== 'hint__menu-link') {
			goTo(currentPart);
		}
	}, false);

	document.addEventListener('mouseup', function (e) {
		if (e.target.className !== 'hint__menu-link' && !isHover) {
			resetAll();
			myHint.close();
		}
	}, false);
}
