class BrainModel {
	constructor() {
		this.imageLoader = new THREE.ImageLoader();
		this.XHRLoader = new THREE.XHRLoader();
		this.jsonUrl = 'models/new-brain/test-groups.json';
		this.loadedImages = [];
		this.loadImages();
	}
	loadImages() {
		let promiseArray = [],
			path = 'models/new-brain/';

		let texturesList = [{
			url: '1_Base_Color-min.png',
			name: '1_Base_Color'
		}, {
			url: '1_Metallic-min.png',
			name: '1_Metallic'
		}, {
			url: '1_Normal_OpenGL-min.png',
			name: '1_Normal_OpenGL'
		}, {
			url: '1_Roughness-min.png',
			name: '1_Roughness'
		}, {
			url: '2_Base_Color-min.png',
			name: '2_Base_Color'
		}, {
			url: '2_Metallic-min.png',
			name: '2_Metallic'
		}, {
			url: '2_Normal_OpenGL-min.png',
			name: '2_Normal_OpenGL'
		}, {
			url: '2_Roughness-min.png',
			name: '2_Roughness'
		}, {
			url: '3_Base_Color-min.png',
			name: '3_Base_Color'
		}, {
			url: '3_Normal_OpenGL-min.png',
			name: '3_Normal_OpenGL'
		}, {
			url: '4_Base_Color-min.png',
			name: '4_Base_Color'
		}, {
			url: '4_Normal_OpenGL-min.png',
			name: '4_Normal_OpenGL'
		}];

		texturesList.forEach((item, index) => {

			/*this.imageLoader.load(url, function (error, text) {
				if (error) {
					deferred.reject(new Error(error));
				} else {
					deferred.resolve(text);
				}
			});*/

			promiseArray.push(new Promise((resolve, reject) => {
				this.imageLoader.load(
					path + item.url,
					(image) => {
						this.loadedImages[item.name] = image;
						resolve(image);
					}
				)
			}));
		});

		Promise.all(promiseArray).then((res) => {
			console.log(this.loadedImages['3_Normal_OpenGL']);
		}, (err) => {
			console.log(err);
		});

		// console.log(promises);
		/*Q.allSettled([promises]).then((res) => {
			console.log(res);
		});*/
		/*deferred[0].promise.then(() => {
			console.log(this.loadedImages['1_Base_Color']);
		});*/

	}
	loadImage(url) {
		/*var deferred = Q.defer();
		this.imageLoader.load(url, function (error, text) {
			if (error) {
				deferred.reject(new Error(error));
			} else {
				deferred.resolve(text);
			}
		});
		return deferred.promise;*/


		let deferred = Q.defer();
		this.imageLoader.load(url, (res, a, b) => {
			console.log(res, a, b);
			// this.loadedImages[item.name] = res;
			deferred.resolve(res);
		}, (err) => {
			deferred.reject(err);
		});
		return deferred.promise;
	}
	loadScene() {

	}
}

var brainModel = new BrainModel();



function modelInit() {
	let XHRLoader = new THREE.XHRLoader();
	let jsonUrl = 'models/new-brain/test-groups.json';

	let imageLoader = new THREE.ImageLoader();
	imageLoader.load(
		// resource URL
		'models/new-brain/1_Base_Color-min.png',
		// Function when resource is loaded
		function (image) {
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
		});

}
