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

init();
animate();

function goTo (part) {
	switch (part) {
		case 'o-brain-1':
			console.log('o-brain-1');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationX = (Math.PI * 1) * circleNumber || Math.PI;
			resetAll();
			brainModel.flames.children[0].visible = true;
			brainModel.brain[0].material.emissiveIntensity = 1;
			brainModel.brain[0].selected = true;
			targetRotationY = 1;
			break;
		case 'o-brain-2':
			console.log('o-brain-2');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationX = (Math.PI * 2) * circleNumber;
			resetAll();
			brainModel.flames.children[1].visible = true;
			brainModel.brain[1].material.emissiveIntensity = 1;
			brainModel.brain[1].selected = true;
			targetRotationY = 1;
			break;
		case 'o-brain-3':
			console.log('o-brain-3');
			break;
		case 'o-brain-4':
			console.log('o-brain-4');
			break;
		case 'o-brain-5_1':
			console.log('o-brain-5_1');
			break;
		case 'o-brain-5_2':
			console.log('o-brain-5_2');
			break;
		case 'o-brain-6_1':
			console.log('o-brain-6_1');
			break;
		case 'o-brain-6_2':
			console.log('o-brain-6_2');
			break;
		case 'o-brain-7':
			console.log('o-brain-7');
			break;
		default:
			resetAll();
			break;
	}
}

function resetAll() {
	resetFlames();
	resetSelection();
}

function resetFlames() {
	for (let i = 0; i < 7; i++) {
		brainModel.flames.children[i].visible = false;
	}
}

function resetSelection() {
	for (let i = 0; i < 7; i++) {
		brainModel.brain[i].selected = false;
		brainModel.brain[i].material.emissiveIntensity = 0;
	}
}

document.addEventListener( 'mousedown', function () {
	goTo(currentPart);
}, false );

function init() {
	// scene = new THREE.Scene();

	// lightInit();
	raycaster = new THREE.Raycaster(); // create once
	// modelInit();
	// mouseHover();

	// lines();

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

}
