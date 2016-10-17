function goTo(part) {
	let data;
	isSelected = true;
	switch (part) {
		case 'o-brain-1':
			console.log('[0] o-brain-1');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = 0.84;
			targetRotationX = 3.32 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[0].visible = true;
			fadeIn(brainModel.brain[0]);
			brainModel.brain[0].selected = true;

			data = {
				id: 'about',
				title: 'О компании',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-2':
			console.log('[1] o-brain-2');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = 0.75;
			targetRotationX = -0.2 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[1].visible = true;
			// brainModel.flames.children[1].material.alphaTest = 0.05;
			flamePulsing(brainModel.flames.children[1]);
			// console.log(brainModel.flames.children[1]);
			fadeIn(brainModel.brain[1]);
			brainModel.brain[1].selected = true;

			data = {
				id: 'servises',
				title: 'Услуги',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-3':
			console.log('[2] o-brain-3');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.23;
			targetRotationX = 2.15 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[2].visible = true;
			fadeIn(brainModel.brain[2]);
			brainModel.brain[2].selected = true;

			data = {
				id: 'projects',
				title: 'Проекты',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-4':
			console.log('[3] o-brain-4');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.4;
			targetRotationX = 0.79 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[3].visible = true;
			fadeIn(brainModel.brain[3]);
			brainModel.brain[3].selected = true;

			data = {
				id: 'career',
				title: 'Карьера',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-5_1':
			console.log('[4] o-brain-5_1');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = 3.57 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[4].visible = true;
			fadeIn(brainModel.brain[4]);
			fadeIn(brainModel.brain[5]);
			brainModel.brain[4].selected = true;
			brainModel.brain[5].selected = true;

			data = {
				id: 'news',
				title: 'Новости',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-5_2':
			console.log('[5] o-brain-5_2');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = 3.57 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[4].visible = true;
			fadeIn(brainModel.brain[4]);
			fadeIn(brainModel.brain[5]);
			brainModel.brain[4].selected = true;
			brainModel.brain[5].selected = true;

			data = {
				id: 'news',
				title: 'Новости',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-6_1':
			console.log('[6] o-brain-6_1');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = -0.59 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[5].visible = true;
			fadeIn(brainModel.brain[6]);
			fadeIn(brainModel.brain[7]);
			brainModel.brain[6].selected = true;
			brainModel.brain[7].selected = true;

			data = {
				id: 'contacts',
				title: 'Контакты',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-6_2':
			console.log('[7] o-brain-6_2');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = -0.59 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[5].visible = true;
			fadeIn(brainModel.brain[6]);
			fadeIn(brainModel.brain[7]);
			brainModel.brain[6].selected = true;
			brainModel.brain[7].selected = true;

			data = {
				id: 'contacts',
				title: 'Контакты',
				menu: [{
					text: 'История',
					url: 'http://ya.ru'
				}, {
					text: 'Менеджмент',
					url: 'http://ya.ru'
				}, {
					text: 'Наша жизнь',
					url: 'http://ya.ru'
				}]
			};

			setTimeout(() => {
				myHint.setData(data).open();
			}, 500);
			break;
		case 'o-brain-7':
			console.log('[8] o-brain-7');
			break;
		default:
			isSelected = false;
			resetAll();
			myHint.close();
			break;
	}
}

function resetAll() {
	resetFlames();
	resetSelection();
	resetIntense();
}

function resetFlames() {
	for (let i = 0; i < 7; i++) {
		brainModel.flames.children[i].visible = false;
	}
}

function resetSelection() {
	for (let i = 0; i < 9; i++) {
		brainModel.brain[i].selected = false;
	}
}

function resetIntense() {
	for (let i = 0; i < 9; i++) {
		if (brainModel.brain[i].material.emissiveIntensity === maxIntense) {
			fadeOut(brainModel.brain[i]);
		}
	}
}
