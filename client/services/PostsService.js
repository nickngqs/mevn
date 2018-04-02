import Api from '@/services/NewApi'

export default {

	findAll(data) {
		return Api().get(`/posts`);
	},

	findOne(id) {
		return Api().get(`/posts/${id}`)
	},

	add(data) {
		// return Api().post('/cars', data)
	},

	update(id, data) {
		return Api().put(`/posts/${id}`, data)
	},

	delete(id) {
		// return Api().delete(`/cars/${id}`)
	}

}
