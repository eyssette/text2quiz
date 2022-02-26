import katex from "katex";
export function katexify(math, displayMode = false) {
	const options = {
		displayMode: displayMode,
		throwOnError: false
	};
	return katex.renderToString(math, options);
}

export function katexifyString(stringInitial) {
	let stringFinal = '';
	let arr = stringInitial.split('$$');
	if (Array.isArray(arr)) {
		if (arr.length > 2 && arr.length % 2 == 1) {
			arr.forEach((element, i) => {
				if (i % 2 == 1 && element != '') {
					stringFinal = stringFinal + katexify(element)
				} else {
					stringFinal = stringFinal + element
				}
			})
			return ((stringFinal != '') ? stringFinal : stringInitial);
		} else {
			return stringInitial
		}
	}
}