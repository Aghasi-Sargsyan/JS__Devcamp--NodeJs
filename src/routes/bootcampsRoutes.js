const express = require('express');
const {
	createBootcamp,
	deleteBootcamp,
	getBootcamp,
	getBootcamps,
	updateBootcamp,
	getBootcampsInRadius
} = require('../controllers/bootcampsController');

const router = express.Router();

router.route('/')
	.get(getBootcamps)
	.post(createBootcamp);

router.route('/:id')
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

router.route('/radius/:latLng/:distance')
	.get(getBootcampsInRadius);

module.exports = router;