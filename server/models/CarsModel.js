const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

/*=================================================
/	Schema
/================================================*/

const CarSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	brand: {
		type: String,
		required: true
	},
	engine: {
		type: String
	},
	power: {
		type: Number,
	}
})

CarSchema.plugin(mongoosePaginate)

const Car = mongoose.model('Car', CarSchema)

/*=================================================
/	CRUD Functions
/================================================*/

const query = 'name brand engine power'

function create(object) {

	let car = new Car({
		name: object.name,
		brand: object.brand,
		engine: object.engine,
		power: object.power
	})

	return car.save();
}

function read() {
	return Car.find({}, query);
}

function paginate(page, limit) {
	return Car
			.paginate({}, {
				page: page,
				limit: limit,
				select: query,
				sort: { _id: -1 }
			});
}

function readById(id) {
	return Car.findById(id, query);
}

function update(id, object) {

	return Car
			.findById(id, query)
			.then((car) => {

				car.name = object.name
				car.brand = object.brand
				car.engine = object.engine
				car.power = object.power

				return car.save();
			});
}

function remove(id) {
	return Car.remove({ _id: id });
}

module.exports = { create, read, readById, update, remove, paginate }
