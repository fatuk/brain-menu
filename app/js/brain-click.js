function goTo (part) {
	switch (part) {
		case 'o-brain-1':
			console.log('[0] o-brain-1');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = 0.84;
			targetRotationX = 3.32 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[0].visible = true;
			brainModel.brain[0].material.emissiveIntensity = 1;
			brainModel.brain[0].selected = true;
			break;
		case 'o-brain-2':
			console.log('[1] o-brain-2');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = 0.75;
			targetRotationX = -0.2 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[1].visible = true;
			brainModel.brain[1].material.emissiveIntensity = 1;
			brainModel.brain[1].selected = true;
			break;
		case 'o-brain-3':
			console.log('[2] o-brain-3');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.23;
			targetRotationX = 2.15 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[2].visible = true;
			brainModel.brain[2].material.emissiveIntensity = 1;
			brainModel.brain[2].selected = true;
			break;
		case 'o-brain-4':
			console.log('[3] o-brain-4');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.4;
			targetRotationX = 0.79 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[3].visible = true;
			brainModel.brain[3].material.emissiveIntensity = 1;
			brainModel.brain[3].selected = true;
			break;
		case 'o-brain-5_1':
			console.log('[4] o-brain-5_1');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = 3.57 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[4].visible = true;
			brainModel.brain[4].material.emissiveIntensity = 1;
			brainModel.brain[5].material.emissiveIntensity = 1;
			brainModel.brain[4].selected = true;
			brainModel.brain[5].selected = true;
			break;
		case 'o-brain-5_2':
			console.log('[5] o-brain-5_2');
			circleNumber = Math.floor(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = 3.57 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[4].visible = true;
			brainModel.brain[4].material.emissiveIntensity = 1;
			brainModel.brain[5].material.emissiveIntensity = 1;
			brainModel.brain[4].selected = true;
			brainModel.brain[5].selected = true;
			break;
		case 'o-brain-6_1':
			console.log('[6] o-brain-6_1');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = -0.59 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[5].visible = true;
			brainModel.brain[6].material.emissiveIntensity = 1;
			brainModel.brain[7].material.emissiveIntensity = 1;
			brainModel.brain[6].selected = true;
			brainModel.brain[7].selected = true;
			break;
		case 'o-brain-6_2':
			console.log('[7] o-brain-6_2');
			circleNumber = Math.round(mesh.rotation.y / (Math.PI * 2));
			targetRotationY = -0.5;
			targetRotationX = -0.59 + (circleNumber * Math.PI * 2);
			resetAll();
			brainModel.flames.children[5].visible = true;
			brainModel.brain[6].material.emissiveIntensity = 1;
			brainModel.brain[7].material.emissiveIntensity = 1;
			brainModel.brain[6].selected = true;
			brainModel.brain[7].selected = true;
			break;
		case 'o-brain-7':
			console.log('[8] o-brain-7');
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
	for (let i = 0; i < 9; i++) {
		brainModel.brain[i].selected = false;
		brainModel.brain[i].material.emissiveIntensity = 0;
	}
}
