
module.exports.forEach = (array, myFunc) => {
	let promises = []
	array.forEach(val => {
		promises.push(myFunc(val))
	});

	return Promise.all(promises)
}