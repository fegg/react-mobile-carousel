;(win => {
	const doc = win.document;
	const docEle = doc.documentElement;

	let metaEle = doc.querySelector('meta[name="viewport"]');
	let dpr = win.devicePixelRatio || 1;

	if (dpr >= 3) {
		dpr = 3;
	}
	if (dpr === 2) {
		dpr === 2;
	}

	docEle.setAttribute('data-dpr', dpr);
	win.dpr = dpr;

	const scale = 1 / dpr;

	if (!metaEle) {
		metaEle = doc.createElement('meta');
		metaEle.setAttribute('name', 'viewport');
		docEle.firstElementChild.appendChild(metaEle);
	}
	metaEle.setAttribute('content', `initial-scale=${scale}, 
		maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`);

	const refreshRem = () => {
		let width = docEle.getBoundingClientRect().width;
		// if (width / dpr > 540) {
		// 	width = 540 * dpr
		// }
		const rem = width / 10;
		docEle.style.fontSize = rem + 'px';
		win.rem = rem;
	}

	refreshRem();

	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = 12 * dpr + 'px';
	} else {
		doc.addEventListener('DOMContentLoaded', function(e) {
			doc.body.style.fontSize = 12 * dpr + 'px';
		}, false);
	}

	win.addEventListener('resize', ()=> {
		refreshRem()
	}, false);

})(window)

// reference linking: https://github.com/amfe/lib-flexible