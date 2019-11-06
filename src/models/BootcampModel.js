const mongoose = require('mongoose');

const schemaErrGenerator = {
	missingErr: (name)=> `Please add ${name}`,
	lengthErr: (name, len) => `${name} can not be more than ${len} chars`,
	validErr: (name) => `Please add a valid ${name}`,
	moreThanErr: (name, num) => `${name} can not be more than ${num}`,
	lessThanErr: (name, num) => `${name} can not be less than ${num}`
};

const {missingErr, lengthErr, validErr, lessThanErr, moreThanErr} = schemaErrGenerator;

const BootcampSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, missingErr('name')],
		unique: true,
		trim: true,
		maxLength: [50, lengthErr('name', 50)]
	},
	slug: String,
	description: {
		type: String,
		required: [true, missingErr('description')],
		maxLength: [500, 'Description can not be more than 500 chars']
	},
	website: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			validErr('website')
		]
	},
	phone: {
		type: String,
		maxLength: [20, lengthErr('phone')]
	},
	email:{
		type:String,
		required: [true, 'Please add email'],
		match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, validErr('email')]
	},
	address: {
		type: String,
		required: [true, missingErr('address')]
	},
	location: {
		//GeoJson Point
		type: {
			type: String,
			enum: ['Point'],
			// required: true
		},
		coordinates: {
			type: [Number],
			// required: true,
			index: '2dsphere'
		},
		formattedAddress: String,
		state: String,
		country: String,
		city: String,
		street: String,
		zipcode: String,
	},
	careers: {
		type: [String],
		enum: [
			"Web Development",
			"Mobile Development",
			"UI/UX", "Business",
			"Data Science",
			"Other"
		]
	},
	averageRating: {
		type: Number,
		min: [1, lessThanErr('average rating', 1)],
		max: [10, moreThanErr('average rating', 10)]
	},
	averageCost: Number,
	photo: {
		type: String,
		default: 'no-photo.jpg'
	},
	housing: {
		type: Boolean,
		default: false
	},
	jobAssistance: {
		type: Boolean,
		default: false
	},
	jobGuarantee: {
		type: Boolean,
		default: false
	},
	acceptGi: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);