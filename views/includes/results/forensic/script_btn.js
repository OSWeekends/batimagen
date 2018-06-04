
function updateImg (data) {
	const targetImg = document.querySelector(".forensic-image");
	const originalImg = targetImg.getAttribute("data-image-original");
	
	if(data !== "original"){
		const filename = originalImg.replace(/\.[^/.]+$/, "");
		targetImg.src = `forensic/${filename}${data}.png`;
	} else {
		targetImg.src = `forensic/${originalImg}`;
	}
};