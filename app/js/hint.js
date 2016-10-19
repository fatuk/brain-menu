class Hint {
	constructor() {
		this.data = this.data || {};
		this.$body = $('body');
	}
	setData(data) {
		this.data = data;
		return this;
	}
	getMenu(data) {
		let menuHtml = '';
		for (let item in data) {
			menuHtml += `
<li class="hint__menu-item">
	<a href="${data[item].url}" class="hint__menu-link">
		${data[item].text}
	</a>
</li>
`;
		}
		this.menuTemplate = `
<ul class="hint__menu">
	${menuHtml}
</ul>
`;
		return this.menuTemplate;
	}
	open() {
		this.$body = $('body');
		this.template = `
<div id="${this.data.id}" class="hint js-hint animated fadeIn">
	<!-- Hint -->
	<img src="./img/hint.svg" alt="" class="hint__background">
	<div class="hint__container">
		<h2 class="hint__title">
			${this.data.title}
		</h2>
		${this.getMenu(this.data.menu)}
	</div>
</div>
`;
		if (!this.$body.find('#' + this.data.id).length) {
			this.destroy();
			this.$body.append(this.template);
			this.$hint = $('.js-hint');
		}
		return this;
	}
	close() {
		if (this.$hint) {
			this.$hint.addClass('fadeOut');
			setTimeout(() => {
				this.destroy();
			}, 1000);
		}
	}
	destroy() {
		if (this.$hint) {
			this.$hint.remove();
			this.data = {};
		}
	}
};

myHint = new Hint();
