let context = canvas.getContext('2d');

const gfx = {
	loaderOpen: true,
	bg: {},
	drawImage: async (image, x = 0, y = 0, scaleMultiplier) => {
		let img = new Image();
		img.src = image;

		await img.decode();
		let width = img.width * scaleMultiplier;
		let height = img.height * scaleMultiplier;

		context.drawImage(img, x, y, width, height);
		return { img, x, y, width, height, dragging: false };
	},
	drawBg: async (image, scaleMultiplier) => {
		let img = new Image();
		img.src = image;

		await img.decode();
		let width = img.width * scaleMultiplier;
		let height = img.height * scaleMultiplier;

		x = window.innerWidth / 2 - width / 2;
		y = window.innerHeight / 2 - height / 2;

		context.drawImage(img, x, y, width, height);
		bg = { img, x, y, width, height };
		return bg;
	},
	redrawImage: (img, x, y, width, height, circles) => {
		gfx.clear();
		context.drawImage(bg.img, bg.x, bg.y, bg.width, bg.height);
		
		for (let image of circles) {
			if (image.img != img) {
				context.drawImage(image.img, image.x, image.y, image.width, image.height);
			} else {
				context.drawImage(img, x, y, width, height);
			}
		}
	},
	toggleLoadingScreen: () => {
		if (gfx.loaderOpen) {
			$("#loadingScreen").hide();
			gfx.loaderOpen = false;
		} else {
			$("#loadingScreen").show();
			gfx.loaderOpen = true;
		}
	},
	clear: () => {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}