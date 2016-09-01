class Modal {
	constructor() {
		this.data = this.data || {};
	}
	setData(data) {
		this.data = data;
		return this;
	}
	open() {
		let $body = $('body');
		this.template = `
<div id="${this.data.id}" class="modal js-modal animated fadeIn">
	<!-- Modal -->
	<h2 class="modal__title">
		${this.data.title}
	</h2>
	<p class="modal__text">
		${this.data.text}
	</p>
	<a href="${this.data.link}" class="btn btn_red btn_upper">
		<span class="btn__text">
			Подробнее
		</span>
	</a>
</div>
<div class="animated fadeIn overlay js-overlay"></div>
`;
		if (!$body.find('#' + this.data.id).length) {
			this.destroy();
			$body.append(this.template);
			this.$overlay = $('.js-overlay');
			this.$modal = $('.js-modal');
			this.$overlay.on('click tap', () => {
				this.close();
			});
		}
		return this;
	}
	close() {
		this.$modal.addClass('fadeOut');
		this.$overlay.addClass('fadeOut');
		animate();

		setTimeout(() => {
			this.destroy();
		}, 1000);
	}
	destroy() {
		if (this.$overlay && this.$modal) {
			this.$overlay.off('click tap');
			this.$overlay.remove();
			this.$modal.remove();
			this.data = {};
		}
	}
};

myModal = new Modal();
