function menu () {
	let $aboutBtn = $('.js-about') || {};
	let $projectsBtn = $('.js-projects') || {};
	let $servicesBtn = $('.js-services') || {};
	let $contactsBtn = $('.js-contacts') || {};

	$aboutBtn.on('click', () => {
		console.log('about');
		let circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = (Math.PI * 2) * circleNumber;
		targetRotationY = 0;

		let data = {
			id: 'about',
			title: 'О компании',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};
		myModal.setData(data).open();
	});
	$projectsBtn.on('click', () => {
		console.log('projects');
		targetRotationY = 1;

		let data = {
			id: 'projects',
			title: 'Проекты',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};
		myModal.setData(data).open();
	});
	$servicesBtn.on('click', () => {
		console.log('services');
		let circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = (Math.PI * 2) * circleNumber + Math.PI;
		targetRotationY = 0;

		let data = {
			id: 'services',
			title: 'Услуги',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};
		myModal.setData(data).open();
	});
	$contactsBtn.on('click', () => {
		console.log('contacts');
		targetRotationY = -0.5;

		let data = {
			id: 'contacts',
			title: 'Контакты',
			text: 'Компания сцециализируется на предоставлении комплекса<br> услуг, необходимых для эффективной работы<br> с компаниями Китая',
			link: "#"
		};
		myModal.setData(data).open();
	});
}
