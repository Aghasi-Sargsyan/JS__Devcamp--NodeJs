const path = require('path');
const {rootPath} = require('../config/config');

exports.createResponse = (data, success, error) => {
	console.log(data);
	if (success === undefined
		&& data !== undefined
		&& data !== null
		&& !isNaN(data) || !!data)
	{
		success = true;
	}

	return {
		success: success || false,
		error:  error || '',
		data:  data || null,
	};
};

exports.rootJoin = (rote) => {
	return path.join(rootPath,rote)
};