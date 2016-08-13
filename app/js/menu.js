function menu () {
	let $aboutBtn = document.getElementsByClassName('js-about')[0] || {};
	let $projectsBtn = document.getElementsByClassName('js-projects')[0] || {};
	let $servicesBtn = document.getElementsByClassName('js-services')[0] || {};
	let $contactsBtn = document.getElementsByClassName('js-contacts')[0] || {};

	$aboutBtn.addEventListener('click', function () {
		console.log('about');
		var circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = (Math.PI * 2) * circleNumber;
		targetRotationY = 0;
	});
	$projectsBtn.addEventListener('click', function () {
		console.log('projects');
		targetRotationY = 1;
	});
	$servicesBtn.addEventListener('click', function () {
		console.log('services');
		var circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
		targetRotationX = (Math.PI * 2) * circleNumber + Math.PI;
		targetRotationY = 0;
	});
	$contactsBtn.addEventListener('click', function () {
		console.log('contacts');
		targetRotationY = -0.5;
	});
}
