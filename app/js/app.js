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
let $info = document.getElementsByClassName('js-info')[0];

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

// Info
window.showInfo = false;

// Hover config
let isHover = false;
let isMoving = false;
let isMovingLocked = false;
let isSelected = false;
let isStoped;


init();
animate();

// Player
let brainPlayer;
let waitingTimer;
waitingTimer = waitForPlayer();

function isStopedFn() {
	if (!isStoped) {
		isStoped = true;
		window.dispatchEvent(hasStoped);
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
		isMovingLocked = true;
		stopTimer(waitingTimer);
		resetFlames();
		myHint.close();
		waitingTimer = waitForPlayer();
	}, false);

	document.addEventListener('mouseup', function (e) {
		if (e.target.className !== 'hint__menu-link' && !isMoving) {
			goTo(currentPart);
		}
	}, false);
}
