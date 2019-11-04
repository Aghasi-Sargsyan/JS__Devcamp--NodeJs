let id = 1;
let counter = 1;

exports.bootcamps = new Array(10).fill(null).map(el => {
	return {id: id++, name: 'John' + counter++};
});