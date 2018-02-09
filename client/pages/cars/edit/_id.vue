<template lang='pug'>
	section.section
		.container
			.container__header
				h1 Edit {{ name }}
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
					button(class='ui button' @click.prevent='updateCar($event)') Save
</template>

<script>
import CarsService from '@/services/CarsService'
import Noty from 'noty'

export default {

	data() {
		return {
			name: '',
			brand: '',
			engine: '',
			power: ''
		}
	},

	created() {
		this.getCar();
	},

	methods: {

		async getCar() {

			let id = this.$route.params.id;

			try {
				const response = await CarsService.findOne(id);

				this.name = response.data.name;
				this.brand = response.data.brand;
				this.engine = response.data.engine;
				this.power = response.data.power;
			}

			catch(error) {
				console.log(error);
			}

		},

		async updateCar(event) {

			let id = this.$route.params.id,
				data = {
					name: this.name,
					brand: this.brand,
					engine: this.engine,
					power: this.power
				};

			let $currTarget = event.currentTarget;

			$currTarget.classList.add('loading');

			try {
				const response = await CarsService.update(id, data);

				setTimeout(() => {
					$currTarget.classList.remove('loading');
				}, 300);

				if (response.data.status == 'Success') {
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

<style scoped>
.container {
	width: 100%;
	max-width: 1024px;

	margin-left: auto;
	margin-right: auto;
}
</style>
