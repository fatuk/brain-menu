function menu () {
	let $aboutBtn = $('.js-about') || {};
	let $projectsBtn = $('.js-projects') || {};
	let $servicesBtn = $('.js-services') || {};
	let $contactsBtn = $('.js-contacts') || {};
	let delay = 1000;

	$aboutBtn.on('click tap', () => {
		console.log('about');
		let circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = (Math.PI * 2) * circleNumber;
		targetRotationY = 0;

		let data = {
			id: 'about',
			title: 'О компании',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "http://ya.ru"
		};

		setTimeout(() => {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
	$projectsBtn.on('click tap', () => {
		console.log('projects');
		targetRotationY = 1;

		let data = {
			id: 'projects',
			title: 'Проекты',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "http://ya.ru"
		};
		setTimeout(() => {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
	$servicesBtn.on('click tap', () => {
		console.log('services');
		let circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = (Math.PI * 2) * circleNumber + Math.PI;
		targetRotationY = 0;

		let data = {
			id: 'services',
			title: 'Услуги',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "http://ya.ru"
		};
		setTimeout(() => {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
	$contactsBtn.on('click tap', () => {
		console.log('contacts');
		targetRotationY = -0.5;

		let data = {
			id: 'contacts',
			title: 'Контакты',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "http://ya.ru"
		};
		setTimeout(() => {
			cancelAnimationFrame(animationLoop);
			myModal.setData(data).open();
		}, delay);
	});
}
