const {createResponse} = require('../helpers/general');
let {bootcamps} = require('../helpers/fakeDB');

//@desc Get all bootcamps
//@route GET api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next)=>{
	res.status(200).json(createResponse(bootcamps))
};

//@desc Get single bootcamp
//@route GET api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next)=>{
	const id = req.params.id.toString();
	const response = bootcamps.find(el => id === el.id.toString());
	res.status(200).json(createResponse(response));
};

//@desc Create a bootcamp
//@route POST api/v1/bootcamps
//@access Private
exports.createBootcamp = (req, res, next)=>{
	res.status(200).json(createResponse( 'post bootcamp '));
};

//@desc Update a bootcamp
//@route PUT api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = (req, res, next)=>{
	const id = req.params.id.toString();
	res.status(200).json(createResponse( 'update bootcamp by id'));
};

//@desc Delete a bootcamp
//@route DELETE api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req, res, next)=>{
	const id = req.params.id.toString();
	bootcamps = bootcamps.filter(el => id !== el.id.toString());
	res.status(200).json(createResponse( 'update bootcamp by id'));
};