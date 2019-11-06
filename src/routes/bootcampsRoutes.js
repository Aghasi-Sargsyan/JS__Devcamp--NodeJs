const express = require('express');
const {createBootcamp,deleteBootcamp,getBootcamp,getBootcamps,updateBootcamp} = require('../controllers/bootcampsController');

const router = express.Router();

router.route('/')
	.get(getBootcamps)
	.post(createBootcamp);

router.route('/:id')
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

module.exports = router;