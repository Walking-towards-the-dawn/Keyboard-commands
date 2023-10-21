let slides = document.querySelectorAll('.slide');

let scrollPos = 0;

window.addEventListener('wheel', function (e) {
	let scroller = document.querySelector('.scroller');

	if (e.deltaY > 0) {
		if (scrollPos < window.innerWidth * 0.6 * slides.length) scrollPos += 100;
	} else {
		if (scrollPos != 0) scrollPos -= 100;
	}

	slides.forEach((slide, index) => {
		let text = slide.querySelector('.slide__container');
		text.style.transform = `translateX(-${scrollPos}px)`;
	});
});

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
	return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
	if (!xDown || !yDown) {
		return;
	}

	let xUp = evt.touches[0].clientX;
	let yUp = evt.touches[0].clientY;

	let xDiff = xDown - xUp;
	let yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			if (scrollPos < window.innerWidth * 0.6 * slides.length) scrollPos += 100;
		} else {
			if (scrollPos != 0) scrollPos -= 100;
		}

		slides.forEach((slide, index) => {
			let text = slide.querySelector('.slide__container');
			text.style.transform = `translateX(-${scrollPos}px)`;
		});
	}

	xDown = null;
	yDown = null;
}
