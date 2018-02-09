import Api from '@/services/Api'

export default {

	findAll(data) {
		if (!data) return Api().get('/cars')
		return Api().get(`/cars/page=${data.page}&limit=${data.limit}`)
	},

	findOne(id) {
		return Api().get(`/cars/${id}`)
	},

	add(data) {
		return Api().post('/cars', data)
	},

	update(id, data) {
		return Api().put(`/cars/${id}`, data)
	},

	delete(id) {
		return Api().delete(`/cars/${id}`)
	}

}
