"use strict";

function animate() {
	animationLoop = requestAnimationFrame(animate);
	mouseHover();
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
    projector = void 0,
    INTERSECTED = void 0,
    raycaster = void 0,
    lineContacts = void 0,
    animationLoop = void 0,
    lightHelper2 = void 0,
    myModal = void 0;

var currentState = 'about';
// Texture images
var brainTextures = {};

var angle = 0;
var width = window.innerWidth;
var height = window.innerHeight;

var $rotationInfoX = document.getElementsByClassName('js-rotationX')[0];
var $rotationInfoY = document.getElementsByClassName('js-rotationY')[0];

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

var mouse = new THREE.Vector2(); // create once

init();
animate();

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

	var container = document.getElementById('brain');
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
'use strict';

function onDocumentReady() {
	menu();
}

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

function onMouseHover(event) {
	event.preventDefault();
	mouse.x = event.clientX / window.innerWidth * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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

function menu() {
	var $aboutBtn = $('.js-about') || {};
	var $projectsBtn = $('.js-projects') || {};
	var $servicesBtn = $('.js-services') || {};
	var $contactsBtn = $('.js-contacts') || {};
	var delay = 1000;

	$aboutBtn.on('click tap', function () {
		console.log('about');
		var circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = Math.PI * 2 * circleNumber;
		targetRotationY = 0;

		var data = {
			id: 'about',
			title: 'О компании',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};

		setTimeout(function () {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
	$projectsBtn.on('click tap', function () {
		console.log('projects');
		targetRotationY = 1;

		var data = {
			id: 'projects',
			title: 'Проекты',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};
		setTimeout(function () {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
	$servicesBtn.on('click tap', function () {
		console.log('services');
		var circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = Math.PI * 2 * circleNumber + Math.PI;
		targetRotationY = 0;

		var data = {
			id: 'services',
			title: 'Услуги',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};
		setTimeout(function () {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
	$contactsBtn.on('click tap', function () {
		console.log('contacts');
		targetRotationY = -0.5;

		var data = {
			id: 'contacts',
			title: 'Контакты',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};
		setTimeout(function () {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
	function Modal() {
		_classCallCheck(this, Modal);

		this.data = this.data || {};
	}

	_createClass(Modal, [{
		key: 'setData',
		value: function setData(data) {
			this.data = data;
			return this;
		}
	}, {
		key: 'open',
		value: function open() {
			var _this = this;

			var $body = $('body');
			this.template = '\n<div id="' + this.data.id + '" class="modal js-modal animated fadeIn">\n\t<!-- Modal -->\n\t<h2 class="modal__title">\n\t\t' + this.data.title + '\n\t</h2>\n\t<p class="modal__text">\n\t\t' + this.data.text + '\n\t</p>\n\t<a href="' + this.data.link + '" class="btn btn_red btn_upper">\n\t\t<span class="btn__text">\n\t\t\tПодробнее\n\t\t</span>\n\t</a>\n</div>\n<div class="animated fadeIn overlay js-overlay"></div>\n';
			if (!$body.find('#' + this.data.id).length) {
				this.destroy();
				$body.append(this.template);
				this.$overlay = $('.js-overlay');
				this.$modal = $('.js-modal');
				this.$overlay.on('click tap', function () {
					_this.close();
				});
			}
			return this;
		}
	}, {
		key: 'close',
		value: function close() {
			var _this2 = this;

			this.$modal.addClass('fadeOut');
			this.$overlay.addClass('fadeOut');
			animate();

			setTimeout(function () {
				_this2.destroy();
			}, 1000);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			if (this.$overlay && this.$modal) {
				this.$overlay.off('click tap');
				this.$overlay.remove();
				this.$modal.remove();
				this.data = {};
			}
		}
	}]);

	return Modal;
}();

;

myModal = new Modal();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrainModel = function () {
	function BrainModel() {
		_classCallCheck(this, BrainModel);

		this.imageLoader = new THREE.ImageLoader();
		this.XHRLoader = new THREE.XHRLoader();
		this.jsonUrl = 'models/lite-brain.json';
		this.loadedImages = [];
		this.loadImages();
	}

	_createClass(BrainModel, [{
		key: 'loadImages',
		value: function loadImages() {
			var _this = this;

			var promiseArray = [],
			    path = 'models/textures/';

			var texturesList = [{
				url: '1_Base_Color.jpg',
				name: '1_Base_Color'
			}, {
				url: '1_Metallic.jpg',
				name: '1_Metallic'
			}, {
				url: '1_Mixed_AO.jpg',
				name: '1_Mixed_AO'
			}, {
				url: '1_Normal_OpenGL.jpg',
				name: '1_Normal_OpenGL'
			}, {
				url: '1_Roughness.jpg',
				name: '1_Roughness'
			}, {
				url: '2_Base_Color.jpg',
				name: '2_Base_Color'
			}, {
				url: '2_Metallic.jpg',
				name: '2_Metallic'
			}, {
				url: '3_Base_Color.jpg',
				name: '3_Base_Color'
			}, {
				url: '3_Metallic.jpg',
				name: '3_Metallic'
			}, {
				url: '3_Normal_OpenGL.jpg',
				name: '3_Normal_OpenGL'
			}, {
				url: '4_Base_Color.jpg',
				name: '4_Base_Color'
			}, {
				url: '4_Normal_OpenGL.jpg',
				name: '4_Normal_OpenGL'
			}, {
				url: 'environment.png',
				name: 'environment'
			}, {
				url: 'flame_alpha.jpg',
				name: 'flame_alpha'
			}, {
				url: 'flame_color.jpg',
				name: 'flame_color'
			}, {
				url: 'gears_Base_Color.jpg',
				name: 'gears_Base_Color'
			}, {
				url: 'gears_Metallic.jpg',
				name: 'gears_Metallic'
			}, {
				url: 'gears_Normal_OpenGL.jpg',
				name: 'gears_Normal_OpenGL'
			}, {
				url: 'gears_Roughness.jpg',
				name: 'gears_Roughness'
			}, {
				url: 'glass_alpha.jpg',
				name: 'glass_alpha'
			}, {
				url: 'glass_metallic.jpg',
				name: 'glass_metallic'
			}];

			texturesList.forEach(function (item, index) {
				promiseArray.push(new Promise(function (resolve, reject) {
					_this.imageLoader.load(path + item.url, function (image) {
						_this.loadedImages[item.name] = image;
						resolve(image);
					});
				}));
			});

			Promise.all(promiseArray).then(function (res) {
				_this.loadScene();
			}, function (err) {
				console.log(err);
			});
		}
	}, {
		key: 'loadScene',
		value: function loadScene() {
			var _this2 = this;

			var XHRLoader = new THREE.XHRLoader();
			var jsonUrl = this.jsonUrl;

			XHRLoader.load(jsonUrl, function (text) {
				var json = JSON.parse(text);
				var loader = new THREE.ObjectLoader();

				scene = loader.parse(json.scene);

				var mainGroup = scene.children[1];
				_this2.brainGroup = mainGroup.children[0];
				_this2.gearsGroup = mainGroup.children[1].children;
				_this2.flames = mainGroup.children[2];
				_this2.flames.children[0].visible = false;
				_this2.flames.children[0].visible = true;
				_this2.flames.children[1].visible = false;
				_this2.flames.children[2].visible = false;
				_this2.flames.children[3].visible = false;
				_this2.flames.children[4].visible = false;
				_this2.flames.children[5].visible = false;
				_this2.flames.children[6].visible = false;

				var brain = [];

				for (var i = 0; i < _this2.brainGroup.children.length; i++) {
					brain.push(_this2.brainGroup.children[i]);
				}

				// Update material for flames
				for (var _i = 0; _i < _this2.flames.children.length; _i++) {
					_this2.flames.children[0].material.map.image = _this2.loadedImages['flame_color'];
					_this2.flames.children[0].material.alphaMap.image = _this2.loadedImages['flame_alpha'];
				}

				// Gear 0
				_this2.gearsGroup[0].material.map.image = _this2.loadedImages['gears_Base_Color'];
				_this2.gearsGroup[0].material.normalMap.image = _this2.loadedImages['gears_Normal_OpenGL'];
				_this2.gearsGroup[0].material.roughnessMap.image = _this2.loadedImages['gears_Roughness'];
				_this2.gearsGroup[0].material.metalnessMap.image = _this2.loadedImages['gears_Metallic'];
				_this2.gearsGroup[0].material.envMap.image = _this2.loadedImages['environment'];

				// Glass
				_this2.gearsGroup[6].material.alphaMap.image = _this2.loadedImages['glass_alpha'];
				_this2.gearsGroup[6].material.metalnessMap.image = _this2.loadedImages['glass_metallic'];
				_this2.gearsGroup[6].material.envMap.image = _this2.loadedImages['environment'];

				// Brain 1
				brain[0].material.map.image = _this2.loadedImages['1_Base_Color'];
				brain[0].material.normalMap.image = _this2.loadedImages['1_Normal_OpenGL'];
				brain[0].material.roughnessMap.image = _this2.loadedImages['1_Roughness'];
				brain[0].material.metalnessMap.image = _this2.loadedImages['1_Metallic'];
				brain[0].material.envMap.image = _this2.loadedImages['environment'];
				brain[0].material.emissiveMap.image = _this2.loadedImages['1_Mixed_AO'];

				// Brain 2
				brain[1].material.map.image = _this2.loadedImages['1_Base_Color'];
				brain[1].material.normalMap.image = _this2.loadedImages['1_Normal_OpenGL'];
				brain[1].material.roughnessMap.image = _this2.loadedImages['1_Roughness'];
				brain[1].material.metalnessMap.image = _this2.loadedImages['1_Metallic'];
				brain[1].material.envMap.image = _this2.loadedImages['environment'];
				brain[1].material.emissiveMap.image = _this2.loadedImages['1_Mixed_AO'];

				// Brain 3
				brain[2].material.map.image = _this2.loadedImages['2_Base_Color'];
				brain[2].material.metalnessMap.image = _this2.loadedImages['2_Metallic'];
				brain[2].material.envMap.image = _this2.loadedImages['environment'];

				// Brain 4
				brain[3].material.map.image = _this2.loadedImages['2_Base_Color'];
				brain[3].material.metalnessMap.image = _this2.loadedImages['2_Metallic'];
				brain[3].material.envMap.image = _this2.loadedImages['environment'];

				// Brain 5
				brain[4].material.map.image = _this2.loadedImages['1_Base_Color'];
				brain[4].material.normalMap.image = _this2.loadedImages['1_Normal_OpenGL'];
				brain[4].material.roughnessMap.image = _this2.loadedImages['1_Roughness'];
				brain[4].material.metalnessMap.image = _this2.loadedImages['1_Metallic'];
				brain[4].material.envMap.image = _this2.loadedImages['environment'];
				brain[4].material.emissiveMap.image = _this2.loadedImages['1_Mixed_AO'];

				// Brain 6
				brain[5].material.map.image = _this2.loadedImages['3_Base_Color'];
				brain[5].material.normalMap.image = _this2.loadedImages['3_Normal_OpenGL'];
				brain[5].material.metalnessMap.image = _this2.loadedImages['3_Metallic'];
				brain[5].material.envMap.image = _this2.loadedImages['environment'];

				// Brain 7
				brain[6].material.map.image = _this2.loadedImages['1_Base_Color'];
				brain[6].material.normalMap.image = _this2.loadedImages['1_Normal_OpenGL'];
				brain[6].material.roughnessMap.image = _this2.loadedImages['1_Roughness'];
				brain[6].material.metalnessMap.image = _this2.loadedImages['1_Metallic'];
				brain[6].material.envMap.image = _this2.loadedImages['environment'];
				brain[6].material.emissiveMap.image = _this2.loadedImages['1_Mixed_AO'];

				// Brain 8
				brain[7].material.map.image = _this2.loadedImages['3_Base_Color'];
				brain[7].material.normalMap.image = _this2.loadedImages['3_Normal_OpenGL'];
				brain[7].material.metalnessMap.image = _this2.loadedImages['3_Metallic'];
				brain[7].material.envMap.image = _this2.loadedImages['environment'];

				// Brain 9
				brain[8].material.map.image = _this2.loadedImages['4_Base_Color'];
				brain[8].material.normalMap.image = _this2.loadedImages['4_Normal_OpenGL'];

				cameraInit();

				mesh = scene.children[1];
				mesh.rotation.z = 0.1;
				mesh.rotation.y = 2;
				mesh.rotation.x = 1;
				mesh.position.y = 1.5;
			});
		}
	}]);

	return BrainModel;
}();

var brainModel = new BrainModel();
"use strict";

function mouseHover() {

	// var intersects = raycaster.intersectObjects( scene.children[3].children );
	if (scene) {
		camera.updateMatrixWorld();

		/*scene.children[3].children[0].position.x += 0.01;
  scene.children[3].children[1].position.x += -0.01;
  scene.children[3].children[2].position.y += 0.01;
  scene.children[3].children[3].position.z += 0.01;*/
		// find intersections
		raycaster.setFromCamera(mouse, camera);

		// console.log(scene.children[1].children[0].children);

		// var intersects = raycaster.intersectObjects(scene.children, true);
		var intersects = raycaster.intersectObjects(brainModel.brainGroup.children, true);

		if (intersects.length > 0) {

			if (INTERSECTED != intersects[0].object) {

				if (INTERSECTED) {
					/*switch (INTERSECTED.name) {
     	case 'o-brain-1':
     		brainModel.flames.children[1].visible = true;
     		break;
     	case 'o-brain-2':
     		brainModel.flames.children[0].visible = true;
     		break;
     	case 'o-brain-3':
     		brainModel.flames.children[2].visible = true;
     		break;
     }*/
					console.log(INTERSECTED.name);
					// console.log(brainModel.brainGroup.children);
					INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
					INTERSECTED.material.emissiveIntensity = 0;
				}

				INTERSECTED = intersects[0].object;
				// INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				// INTERSECTED.material.emissive.setHex(0xCC0000);
				// INTERSECTED.material.emissiveIntensity = 0.2;

				// brainModel.flames.children[0].visible = true;
			}
		} else {
			/*brainModel.flames.children[0].visible = false;
   brainModel.flames.children[1].visible = false;
   brainModel.flames.children[2].visible = false;
   brainModel.flames.children[3].visible = false;
   brainModel.flames.children[4].visible = false;
   brainModel.flames.children[5].visible = false;
   brainModel.flames.children[6].visible = false;*/
			if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			INTERSECTED = null;
		}

		renderer.render(scene, camera);
	}
}
"use strict";

function render() {
	if (mesh) {
		// debugger;
		// G1
		brainModel.gearsGroup[0].rotation.z += 0.015 / 4;
		// G2
		// brainModel.gearsGroup[1].rotation.z -= 0.05 / 4;
		// G3
		brainModel.gearsGroup[4].rotation.z -= 0.02 / 4;
		// G4
		brainModel.gearsGroup[2].rotation.z += 0.05 / 4;
		// G5
		brainModel.gearsGroup[3].rotation.z += 0.05 / 4;

		mesh.rotation.y += (targetRotationX - mesh.rotation.y) * ROTATION_BOUNCE;

		// Rotation info
		$rotationInfoX.textContent = Math.round(mesh.rotation.x * 100) / 100;
		$rotationInfoY.textContent = Math.round(mesh.rotation.y * 100) / 100;

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