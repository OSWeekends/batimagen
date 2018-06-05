function updateImg (e, data) {
	const buttons = document.getElementsByClassName("foresic-element_button");
	const targetImg = document.querySelector(".forensic-image");
	const originalImg = targetImg.getAttribute("data-image-original");
	
	if(data !== "original"){
		const filename = originalImg.replace(/\.[^/.]+$/, "");
		targetImg.src = `forensic/${filename}${data}.png`;
	} else {
		targetImg.src = `forensic/${originalImg}`;
	}

	// Clean Active class in buttons
	for (let i = buttons.length; i--; ) {
		buttons[i].classList.remove("active-button");
	}
	// Add class to current button
	e.classList.add("active-button")
};
