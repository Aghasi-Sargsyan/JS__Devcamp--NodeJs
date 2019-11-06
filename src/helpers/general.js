const path = require('path');
const {rootPath} = require('../config/config');

exports.createResponse = (data, error, success, params) => {
	let tempParams = {};

	if (typeof success !== 'boolean' && isDataValid())
		success = true;
	if (isParamsTypeOfObject())
		tempParams = params;

	return {
		success: success || false,
		error:  error || '',
		...tempParams,
		data:  data || null,
	};

	function isDataValid() {
		return data !== undefined && data !== null && !isNaN(data) || !!data
	}

	function isParamsTypeOfObject() {
		const isObject = !Array.isArray(params) && typeof params === 'object';
		return !!params && isObject;
	}
};

exports.rootJoin = (rote) => {
	return path.join(rootPath,rote)
};

exports.ErrorResponse = class ErrorResponse extends Error{
	constructor(name, value, message = ''){
		super(message);

		this.name = name;
		this.value = value;
	}
};



