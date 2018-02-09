<template lang='pug'>
	section.section
		.container
			.container__header
				h1 New Car
			.container__main
				form.ui.form
					.field
						label Name
						input(type='text' v-model='name')
					.field
						label Brand
						input(type='text' v-model='brand')
					.field
						label Engine
						input(type='text' v-model='engine')
					.field
						label Power
						input(type='text' v-model='power')
					button(class='ui button' @click.prevent='addCar($event)') Add Car
</template>

<script>
import CarsService from '@/services/CarsService'
import  Noty from 'noty'

export default {

	data() {
		return {
			name: '',
			brand: '',
			engine: '',
			power: ''
		}
	},

	methods: {

		async addCar(event) {

			let data = this.$data;

			let $currTarget = event.currentTarget;

			$currTarget.classList.add('loading');

			try {
				const response = await CarsService.add(data);

				setTimeout(() => {
					$currTarget.classList.remove('loading');
				}, 300);

				if (response.data.status == 'Success') {
					new Noty({
						type: 'success',
						text: 'Successfully added',
						callbacks: {
							afterShow() {
								setTimeout(() => {
									this.close()
								}, 500)
							}
						}
					}).show();
				}

				if (response.data.status == 'Error') {
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
					}).show();
				}
			}

			catch(error) {
				console.log(error);
			}
		}
	}
}
</script>

<style>
</style>
