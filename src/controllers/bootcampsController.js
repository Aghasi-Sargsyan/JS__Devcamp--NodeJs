const {createResponse} = require('../helpers/general');
const Bootcamp = require('../models/BootcampModel');
const {ErrorResponse} = require('../helpers/general');
const {ERROR_NAMES} = require('../constants/general');
const asyncHandler = require('../middlewares/asyncHandler');

//@desc Get all bootcamps
//@route GET api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find();
	res.statusJson(200, createResponse(bootcamps, null, null, {count: bootcamps.length}));
});

//@desc Get single bootcamp
//@route GET api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const bootcamp = await Bootcamp.findById(id);

	if (!bootcamp) throw new ErrorResponse(ERROR_NAMES.CAST_ERROR, req.params.id);

	res.statusJson(200, createResponse(bootcamp));
});

//@desc Create a bootcamp
//@route POST api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body);
	res.statusJson(201, createResponse(bootcamp));
});

//@desc Update a bootcamp
//@route PUT api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
		new: true, runValidators: true
	});

	if (!bootcamp) throw new ErrorResponse(ERROR_NAMES.CAST_ERROR, req.params.id);

	res.statusJson(201, createResponse(bootcamp));
});

//@desc Delete a bootcamp
//@route DELETE api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const bootcamp = await Bootcamp.findByIdAndDelete(id);

	if (!bootcamp) throw new ErrorResponse(ERROR_NAMES.CAST_ERROR, req.params.id);

	res.statusJson(200, createResponse(null, null, true));
});