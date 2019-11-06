const {createResponse} = require('../helpers/general');
const {ERROR_NAMES, ERROR_STATUSES} = require('../constants/general');

const {CAST_ERROR, VALID_ERROR, DUPLICATE_KEY} = ERROR_NAMES;

function errorHandler(err, req, res, next) {

	console.log(err);

	res.statusJson(genStatusCode(err.name), createResponse(null, genErrorMessage(err)))
}

function genStatusCode(name){
	return ERROR_STATUSES[name] || 500;
}

function genErrorMessage(err){
	const tempError = {...err};
	let {code, name, message, value} = tempError;

	const errName = code || name;

	if (errName === CAST_ERROR)
		return `Resource not found with id of ${value}`;
	if (errName === VALID_ERROR)
		return Object.values(err.errors).map(val => val.message);
	if (errName === DUPLICATE_KEY)
		return 'Duplicate field value entered' ;

	return message;
}

module.exports = errorHandler;