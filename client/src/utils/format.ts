// export function numberWithCommas(x: any) {
// 	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

export function numberWithSpaces(x: any) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
