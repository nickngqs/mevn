const Car = require('../models/CarsModel.js');

module.exports.controller = app => {

	/*=================================================
	/	Response Messages
	/================================================*/

	const message = {
		created: 'Car is successfully created.',
		updated: 'Car is successfully updated',
		deleted: 'Car is successfully removed'
	}

	/*=================================================
	/	Create
	/================================================*/

	app.post('/cars', (req, res) => {

		Car
			.create(req.body)
			.then(() => {
				res.send({
					'status': 'Success',
					'message': message.created
				})
			})
			.catch(() => {
				res.send({
					'status': 'Error'
				})
			})
	})

	/*=================================================
	/	Read
	/================================================*/

	// Get all the cars
	app.get('/cars', (req, res) => {

		console.log('asking for cars');

		Car
			.read()
			.then((results) => {
				res.send({
					'status': 'Success',
					'cars': results
				})
			})
			.catch(() => {
				res.send({
					'status': 'Error'
				})
			})
	})

	// Get a list of cars based on page and limit
	app.get('/cars/page=:page&limit=:limit', (req, res) => {

		let page = parseInt(req.params.page) || 1,
			limit = parseInt(req.params.limit) || 10;

		Car
			.paginate(page, limit)
			.then((results) => {
				res.send({
					'status': 'Success',
					'cars': results.docs
				})
			})
			.catch(() => {
				res.send({
					'status': 'Error'
				})
			})
	})

	// Get a single car
	app.get('/cars/:id', (req, res) => {

		Car
			.readById(req.params.id)
			.then((result) => {
				res.send(result)
			})
			.catch(() => {
				res.send({
					'status': 'Error'
				})
			})
	})

	/*=================================================
	/	Update
	/================================================*/

	app.put('/cars/:id', (req, res) => {

		Car
			.update(req.params.id, req.body)
			.then(() => {
				res.send({
					'status': 'Success',
					'message': message.updated
				})
			})
			.catch(() => {
				res.send({
					'status': 'Error'
				})
			})
	})

	/*=================================================
	/	Delete
	/================================================*/

	app.delete('/cars/:id', (req, res) => {

		let id = req.params.id;

		Car
			.remove(req.params.id)
			.then(() => {
				res.send({
					'status': 'Success',
					'message': message.deleted
				})
			})
			.catch(() => {
				res.send({
					'status': 'Error'
				})
			})
	})

}

