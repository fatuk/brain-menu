class BrainModel {
	constructor() {
		this.imageLoader = new THREE.ImageLoader();
		this.XHRLoader = new THREE.XHRLoader();
		this.jsonUrl = 'models/new-brain.json';
		this.loadedImages = [];
		this.loadImages();
	}
	loadImages() {
		let promiseArray = [],
			path = 'models/textures/';

		let texturesList = [{
			url: '1_Base_Color.jpg',
			name: '1_Base_Color'
		}, {
			url: '1_Metallic.jpg',
			name: '1_Metallic'
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
			url: '2_Normal_OpenGL.jpg',
			name: '2_Normal_OpenGL'
		}, {
			url: '2_Roughness.jpg',
			name: '2_Roughness'
		}, {
			url: '3_Base_Color.jpg',
			name: '3_Base_Color'
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
			url: 'gears_Base_Color.jpg',
			name: 'gears_Base_Color'
		}, {
			url: 'gears_Height.jpg',
			name: 'gears_Height'
		}, {
			url: 'gears_Metallic.jpg',
			name: 'gears_Metallic'
		}, {
			url: 'gears_Normal_OpenGL.jpg',
			name: 'gears_Normal_OpenGL'
		}, {
			url: 'gears_Roughness.jpg',
			name: 'gears_Roughness'
		}];

		texturesList.forEach((item, index) => {
			promiseArray.push(new Promise((resolve, reject) => {
				this.imageLoader.load(
					path + item.url,
					(image) => {
						this.loadedImages[item.name] = image;
						resolve(image);
					}
				);
			}));
		});

		Promise.all(promiseArray).then((res) => {
			this.loadScene();
		}, (err) => {
			console.log(err);
		});

	}
	loadScene() {
		let XHRLoader = new THREE.XHRLoader();
		let jsonUrl = 'models/new-brain.json';

		XHRLoader.load(jsonUrl, (text) => {
			let json = JSON.parse(text);
			let loader = new THREE.ObjectLoader();

			scene = loader.parse(json.scene);
			let mainGroup = scene.children[1];
			let brainGroup = mainGroup.children[0];
			this.gearsGroup = mainGroup.children[1].children;
			let screwGroup = mainGroup.children[2];
			let brain4 = brainGroup.children[0];
			let brain3 = brainGroup.children[1];
			let brain2 = brainGroup.children[2];
			let brain1 = brainGroup.children[3];

			// Gear 0
			this.gearsGroup[0].material.map.image = this.loadedImages['gears_Base_Color'];
			this.gearsGroup[0].material.normalMap.image = this.loadedImages['gears_Normal_OpenGL'];
			this.gearsGroup[0].material.roughnessMap.image = this.loadedImages['gears_Roughness'];
			this.gearsGroup[0].material.metalnessMap.image = this.loadedImages['gears_Metallic'];
			this.gearsGroup[0].material.envMap.image = this.loadedImages['environment'];

			/*gearsGroup[1].material.map.image = this.loadedImages['gears_Base_Color'];
			gearsGroup[2].material.map.image = this.loadedImages['gears_Base_Color'];
			gearsGroup[3].material.map.image = this.loadedImages['gears_Base_Color'];
			gearsGroup[4].material.map.image = this.loadedImages['gears_Base_Color'];
			console.log(gearsGroup[4]);*/
			// this.setImageToGroup(gearsGroup, this.loadedImages['gears_Base_Color']);

			// Brain 1
			brain1.material.map.image = this.loadedImages['1_Base_Color'];
			brain1.material.normalMap.image = this.loadedImages['1_Normal_OpenGL'];
			brain1.material.roughnessMap.image = this.loadedImages['1_Roughness'];
			brain1.material.metalnessMap.image = this.loadedImages['1_Metallic'];
			brain1.material.envMap.image = this.loadedImages['environment'];

			// Brain 2
			brain2.material.map.image = this.loadedImages['2_Base_Color'];
			brain2.material.normalMap.image = this.loadedImages['2_Normal_OpenGL'];
			brain2.material.roughnessMap.image = this.loadedImages['2_Roughness'];
			brain2.material.metalnessMap.image = this.loadedImages['2_Metallic'];
			brain2.material.envMap.image = this.loadedImages['environment'];

			// Brain 3
			brain3.material.map.image = this.loadedImages['3_Base_Color'];
			brain3.material.normalMap.image = this.loadedImages['3_Normal_OpenGL'];

			// Brain 4
			brain4.material.map.image = this.loadedImages['4_Base_Color'];
			brain4.material.normalMap.image = this.loadedImages['4_Normal_OpenGL'];


			cameraInit();

			// console.log(scene.children[1].children[0].material.map);
			mesh = scene.children[1];
			mesh.rotation.z = 0.1;
			mesh.rotation.y = 2;
			mesh.rotation.x = 1;
			mesh.position.y = 1.5;
		});
	}
}

var brainModel = new BrainModel();



function modelInit() {
	let XHRLoader = new THREE.XHRLoader();
	let jsonUrl = 'models/new-brain/test-groups.json';

	XHRLoader.load(jsonUrl, function (text) {
		let json = JSON.parse(text);
		let loader = new THREE.ObjectLoader();

		scene = loader.parse(json.scene);
		console.log(scene.children[1].children[1]);
		scene.children[1].children[0].material.map.image = image;
		scene.children[1].children[1].material.map.image = image;

		cameraInit();

		console.log(scene.children[1].children[0].material.map);
		mesh = scene.children[1];
		mesh.rotation.z = 0.1;
	});

}
