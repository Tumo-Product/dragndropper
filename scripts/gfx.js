let context = canvas.getContext('2d');

const gfx = {
	loaderOpen: true,
	drawnImages: [],
	drawImage: async (imagePath, x = 0, y = 0, centered = false, scaleMultiplier) => {
		let img = new Image();
		img.src = imagePath;

		let dx, dy;
		await img.decode();
		let width = img.width * scaleMultiplier;
		let height = img.height * scaleMultiplier;

		if (centered == true) {
			dx = window.innerWidth / 2 - width / 2;
			dy = window.innerHeight / 2 - height / 2;
		} else {
			dx = x;
			dy = y;
		}

		context.drawImage(img, dx, dy, width, height);
		gfx.drawnImages.push({ img, x: dx, y: dy, width, height });

		return { img, x: dx, y: dy, width, height, dragging: false };
	},
	redrawImage: (img, x, y, width, height) => {
		gfx.clear();

		for (let image of gfx.drawnImages) {
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