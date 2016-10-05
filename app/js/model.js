class BrainModel {
	constructor() {
		this.imageLoader = new THREE.ImageLoader();
		this.XHRLoader = new THREE.XHRLoader();
		this.jsonUrl = 'models/lite-brain-3.json';
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
			url: '2_Mixed_AO.jpg',
			name: '2_Mixed_AO'
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
			url: '3_Metallic.jpg',
			name: '3_Metallic'
		}, {
			url: '3_Mixed_AO.jpg',
			name: '3_Mixed_AO'
		}, {
			url: '3_Normal_OpenGL.jpg',
			name: '3_Normal_OpenGL'
		}, {
			url: '4_Base_Color.jpg',
			name: '4_Base_Color'
		}, {
			url: '4_Mixed_AO.jpg',
			name: '4_Mixed_AO'
		}, {
			url: '4_Normal_OpenGL.jpg',
			name: '4_Normal_OpenGL'
		}, {
			url: 'emission_black.jpg',
			name: 'emission_black'
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
		}, {
			url: 'glass_alpha.jpg',
			name: 'glass_alpha'
		}, {
			url: 'glass_metallic.jpg',
			name: 'glass_metallic'
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
		let jsonUrl = this.jsonUrl;

		XHRLoader.load(jsonUrl, (text) => {
			let json = JSON.parse(text);
			let loader = new THREE.ObjectLoader();

			scene = loader.parse(json.scene);

			let mainGroup = scene.children[1];
			this.brainGroup = mainGroup.children[0];
			this.gearsGroup = mainGroup.children[1].children;
			this.flames = mainGroup.children[2];
			this.flames.children[0].visible = false;
			this.flames.children[0].visible = false;
			this.flames.children[1].visible = false;
			this.flames.children[2].visible = false;
			this.flames.children[3].visible = false;
			this.flames.children[4].visible = false;
			this.flames.children[5].visible = false;
			this.flames.children[6].visible = false;

			let brain = [];

			for (let i = 0; i < this.brainGroup.children.length; i++) {
				brain.push(this.brainGroup.children[i]);
			}

			// Update material for flames
			for (let i = 0; i < this.flames.children.length; i++) {
				this.flames.children[0].material.map.image = this.loadedImages['flame_color'];
				this.flames.children[0].material.alphaMap.image = this.loadedImages['flame_alpha'];
			}

			// Gear 0
			this.gearsGroup[0].material.map.image = this.loadedImages['gears_Base_Color'];
			this.gearsGroup[0].material.normalMap.image = this.loadedImages['gears_Normal_OpenGL'];
			this.gearsGroup[0].material.roughnessMap.image = this.loadedImages['gears_Roughness'];
			this.gearsGroup[0].material.metalnessMap.image = this.loadedImages['gears_Metallic'];
			this.gearsGroup[0].material.envMap.image = this.loadedImages['environment'];
			this.gearsGroup[0].material.emissiveMap.image = this.loadedImages['emission_black'];

			// Glass
			this.gearsGroup[6].material.alphaMap.image = this.loadedImages['glass_alpha'];
			this.gearsGroup[6].material.metalnessMap.image = this.loadedImages['glass_metallic'];
			this.gearsGroup[6].material.envMap.image = this.loadedImages['environment'];

			// Brain 1
			// o-brain-1
			brain[0].material.map.image = this.loadedImages['1_Base_Color'];
			brain[0].material.normalMap.image = this.loadedImages['1_Normal_OpenGL'];
			brain[0].material.roughnessMap.image = this.loadedImages['1_Roughness'];
			brain[0].material.metalnessMap.image = this.loadedImages['1_Metallic'];
			brain[0].material.envMap.image = this.loadedImages['environment'];
			brain[0].material.emissiveMap.image = this.loadedImages['1_Mixed_AO'];

			// Brain 2
			// o-brain-2
			brain[1].material.map.image = this.loadedImages['1_Base_Color'];
			brain[1].material.normalMap.image = this.loadedImages['1_Normal_OpenGL'];
			brain[1].material.roughnessMap.image = this.loadedImages['1_Roughness'];
			brain[1].material.metalnessMap.image = this.loadedImages['1_Metallic'];
			brain[1].material.envMap.image = this.loadedImages['environment'];
			brain[1].material.emissiveMap.image = this.loadedImages['1_Mixed_AO'];

			// Brain 3
			// o-brain-3
			brain[2].material.map.image = this.loadedImages['2_Base_Color'];
			brain[2].material.metalnessMap.image = this.loadedImages['2_Metallic'];
			brain[2].material.envMap.image = this.loadedImages['environment'];
			brain[2].material.emissiveMap.image = this.loadedImages['2_Mixed_AO'];

			// Brain 4
			// o-brain-4
			brain[3].material.map.image = this.loadedImages['2_Base_Color'];
			brain[3].material.metalnessMap.image = this.loadedImages['2_Metallic'];
			brain[3].material.envMap.image = this.loadedImages['environment'];
			brain[3].material.emissiveMap.image = this.loadedImages['2_Mixed_AO'];

			// Brain 5
			// o-brain-5_1
			brain[4].material.map.image = this.loadedImages['1_Base_Color'];
			brain[4].material.normalMap.image = this.loadedImages['1_Normal_OpenGL'];
			brain[4].material.roughnessMap.image = this.loadedImages['1_Roughness'];
			brain[4].material.metalnessMap.image = this.loadedImages['1_Metallic'];
			brain[4].material.envMap.image = this.loadedImages['environment'];
			brain[4].material.emissiveMap.image = this.loadedImages['1_Mixed_AO'];

			// Brain 6
			// o-brain-5_2
			brain[5].material.map.image = this.loadedImages['3_Base_Color'];
			brain[5].material.normalMap.image = this.loadedImages['3_Normal_OpenGL'];
			brain[5].material.metalnessMap.image = this.loadedImages['3_Metallic'];
			brain[5].material.envMap.image = this.loadedImages['environment'];
			brain[5].material.emissiveMap.image = this.loadedImages['3_Mixed_AO'];

			// Brain 7
			// o-brain-6_1
			brain[6].material.map.image = this.loadedImages['1_Base_Color'];
			brain[6].material.normalMap.image = this.loadedImages['1_Normal_OpenGL'];
			brain[6].material.roughnessMap.image = this.loadedImages['1_Roughness'];
			brain[6].material.metalnessMap.image = this.loadedImages['1_Metallic'];
			brain[6].material.envMap.image = this.loadedImages['environment'];
			brain[6].material.emissiveMap.image = this.loadedImages['1_Mixed_AO'];

			// Brain 8
			// o-brain-6_2
			brain[7].material.map.image = this.loadedImages['3_Base_Color'];
			brain[7].material.normalMap.image = this.loadedImages['3_Normal_OpenGL'];
			brain[7].material.metalnessMap.image = this.loadedImages['3_Metallic'];
			brain[7].material.envMap.image = this.loadedImages['environment'];
			brain[7].material.emissiveMap.image = this.loadedImages['3_Mixed_AO'];

			// Brain 9
			// o-brain-7
			brain[8].material.map.image = this.loadedImages['4_Base_Color'];
			brain[8].material.normalMap.image = this.loadedImages['4_Normal_OpenGL'];
			brain[8].material.emissiveMap.image = this.loadedImages['4_Mixed_AO'];

			cameraInit();

			mesh = scene.children[1];
			mesh.rotation.z = 0.1;
			mesh.rotation.y = 2;
			mesh.rotation.x = 1;
			mesh.position.y = 1.5;
		});
	}
}

var brainModel = new BrainModel();
