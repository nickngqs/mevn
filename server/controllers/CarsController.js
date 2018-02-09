const Car = require('../models/CarsModel.js');

/*
 *	REFACTOR
 *
 *	CREATE CRUD HELPER FUNCTIONS
 *  MOVE RESPONSE MESSAGES TO A FUNCTION
 */

module.exports.controller = app => {

	/*=================================================
	/	CREATE
	/================================================*/

	app.post('/cars', (req, res) => {

		console.log(req.body);

		let newCar = new Car({
			name: req.body.name,
			brand: req.body.brand,
			engine: req.body.engine,
			power: req.body.power
		});

		newCar
		.save()
		.then(() => {
			res.send({
				'status': 'Success',
				'message': 'Car is successfully created.',
			})
		})
		.catch(() => {
			console.log('error');
			res.send({
				'status': 'Error'
			})
		});
	})

	/*=================================================
	/	READ
	/================================================*/

	// Get list of cars
	app.get('/cars/page=:page&limit=:limit', (req, res) => {

		let limit = parseInt(req.params.limit) || 10,
			page = parseInt(req.params.page) || 1;

		Car
			.paginate({}, {
				page: page,
				limit: limit,
				select: 'name brand engine power',
				sort: { _id: -1 }
			}, (err, results) => {
				if (err) {
					console.log(err);
				} else {
					res.send({
						'status': 'Success',
						'message': 'Cars is successfully found.',
						'cars': results.docs
					})
				}
			})

		// Car
		// .find({}, 'name brand engine power', (err, cars) => {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		res.send({
		// 			'status': 'Success',
		// 			'message': 'Cars is successfully found.',
		// 			'cars': cars
		// 		})
		// 	}
		// })
		// .sort({ _id: 'asc' })
	})

	// Get a single car
	app.get('/cars/:id', (req, res) => {

		let id = req.params.id;

		Car
		.findById(id, 'name brand engine power', (err, car) => {
			if (err) {
				console.log(err);
			} else {
				res.send(car);
			}
		})

	})

	/*=================================================
	/	UPDATE
	/================================================*/

	app.put('/cars/:id', (req, res) => {

		let id = req.params.id;

		Car
		.findById(id, 'name brand engine power', (err, car) => {
			if (err) {
				console.log(err);
			} else {

				car.name = req.body.name;
				car.brand = req.body.brand;
				car.engine = req.body.engine;
				car.power = req.body.power;

				car
				.save()
				.then(() => {
					res.send({
						'status': 'Success',
						'message': 'Car is successfully saved.'
					})
				})
				.catch(() => {
					res.send({
						'status': 'Error'
					})
				})
			}
		})

	})

	/*=================================================
	/	DELETE
	/================================================*/

	app.delete('/cars/:id', (req, res) => {

		let id = req.params.id;

		Car
		.remove({
			_id: id
		})
		.then(() => {
			res.send({
				'status': 'Success',
				'message': 'Car is successfully deleted.'
			})
		})
		.catch(() => {
			res.send({
				'status': 'Error'
			})
		})
	})

}

