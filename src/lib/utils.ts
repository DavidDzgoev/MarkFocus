export function debounce(func: any, wait: number) {
	let timer: any;

	return function (this: any, ...args: any[]) {
		console.log("===", args);
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			console.log("func = ", func);
			console.log("args = ", args);
			func.apply(this, args);
		}, wait);
	};
}
