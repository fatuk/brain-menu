function waitForPlayer() {
	let counter = 0;
	let endTime = 10;
	let timer = setInterval(function () {
		if (counter === endTime) {
			stopTimer(timer);
			startPlayer();
		}
		counter++;
		console.log('waitForPlayer: ', counter);
	}, 1000);

	stopTimer(brainPlayer);
	return timer;
}

function stopTimer(playerId) {
	window.clearInterval(playerId);
}

function startPlayer() {
	let counter = 0;
	let delay = 5000;
	let parts = [
		'o-brain-1',
		'o-brain-2',
		'o-brain-3',
		'o-brain-4',
		'o-brain-5_1',
		'o-brain-6_1',
		'o-brain-7'
	];

	brainPlayer = setInterval(function () {
		if (counter === parts.length - 1) {
			counter = 0;
		}
		goTo(parts[counter]);
		counter++;
	}, delay);
}
