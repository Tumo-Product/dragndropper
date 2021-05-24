let context = canvas.getContext('2d');

const graphics = {
	drawImage: (imagePath, x = 0, y = 0, centered = false) => {
		let img = new Image();
		img.src = imagePath;
		img.onload = function ()
		{
			let width = img.width * 0.35;
			let height = img.height * 0.35;

			let dx;
			let dy;

			if (centered == true) {
				dx = window.innerWidth / 2 - width / 2;
				dy = window.innerHeight / 2 - height / 2;
			} else {
				dx = x;
				dy = y;
			}

			console.log(dx, dy);

			context.drawImage(img, dx, dy, width, height);
		};
	}
}