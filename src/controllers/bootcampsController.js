const {createResponse} = require('../helpers/general');
const BootcampModel = require('../models/BootcampModel');
const {ErrorResponse, removeQueryField} = require('../helpers/general');
const {ERROR_NAMES} = require('../constants/general');
const asyncHandler = require('../middlewares/asyncHandler');

//@desc Get all bootcamps
//@route GET api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

	const myReqQuery = removeQueryField(req.query);

	const query = BootcampModel.find(myReqQuery);

	if (req.query.select){
		const fields =  req.query.select.split(',').join(' ');
		query.select(fields);
	}

	if (req.query.sort){
		const fields = req.query.sort.split(',').join(' ');
		query.sort(fields);
	}else {
		query.sort('-createdAt');
	}

	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 25;
	const firstIndex = (page -1) * limit;
	const lastIndex = page * limit;
	const total = await BootcampModel.countDocuments();

	const pagination = {
		limit,
		nextPage: lastIndex < total ? page+1 : null,
		prevPage: firstIndex > 0 ? page-1 : null
	};

	query.skip(firstIndex).limit(limit);

	const bootcamps = await query;

	res.statusJson(200, createResponse(bootcamps, null, null, {pagination, count: bootcamps.length}));
});

//@desc Get single bootcamp
//@route GET api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const bootcamp = await BootcampModel.findById(id);

	if (!bootcamp) throw new ErrorResponse(ERROR_NAMES.CAST_ERROR, req.params.id);

	res.statusJson(200, createResponse(bootcamp));
});

//@desc Create a bootcamp
//@route POST api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await BootcampModel.create(req.body);
	res.statusJson(201, createResponse(bootcamp));
});

//@desc Update a bootcamp
//@route PUT api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const bootcamp = await BootcampModel.findByIdAndUpdate(id, req.body, {
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
	const bootcamp = await BootcampModel.findByIdAndDelete(id);

	if (!bootcamp) throw new ErrorResponse(ERROR_NAMES.CAST_ERROR, req.params.id);

	res.statusJson(200, createResponse(null, null, true));
});

//@desc Get Bootcamps By Distance
//@route GET api/v1/bootcamps/radius/:latLng/:distance
//@access Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
	const {latLng, distance} = req.params;
	const [lat, lng] = latLng.split(',');

	const EARTH_RADIUS = 6371;
	const bootcamps = await BootcampModel.find(
		{ location: { $geoWithin: { $centerSphere: [ [lng, lat], distance / EARTH_RADIUS] } } }
	);

	res.statusJson(200, createResponse(bootcamps,null,null, {count: bootcamps.length}));
});