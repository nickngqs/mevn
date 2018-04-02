import Noty from 'noty'

const Notification = {

	methods: {

		successHandler() {

			new Noty({
				type: 'success',
				text: 'Successfully updated',
				callbacks: {
					afterShow() {
						setTimeout(() => {
							this.close()
						}, 500)
					}
				}
			}).show()
		},

		errorHandler() {

			new Noty({
				type: 'error',
				text: 'Error!',
				callbacks: {
					afterShow() {
						setTimeout(() => {
							this.close()
						}, 500)
					}
				}
			}).show()
		}
	}

}

export default Notification
