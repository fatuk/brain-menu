function loadProgress (loading) {
	let $progressContainer = document.getElementsByClassName('js-loader')[0];
	let total = loading.total;
	let loaded = loading.loaded;
	let loadedPercents = Math.round(loaded/total*100);

	$progressContainer.textContent = `${loadedPercents} %`;

	if (loadedPercents === 0) {
		setTimeout(function () {
			$progressContainer.className = 'hide';
		}, 500)
	}
}
