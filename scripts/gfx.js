const gfx = {
	loaderOpen: true,
	toggleLoadingScreen: () => {
		if (gfx.loaderOpen) {
			$("#loadingScreen").hide();
		} else {
			$("#loadingScreen").show();
		}
		
		gfx.loaderOpen = !gfx.loaderOpen;
	},
}