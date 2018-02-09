<template lang='pug'>
	section
		.container
			.container__header
				h1 Cars

			.container__search

				.container__search__left
					.ui.form
						.field
							input(type='text' placeholder='Search Filter...')

				.container__search__right
					nuxt-link(to='/cars/new')
						.ui.button.nowrap Add New

			.container__main
				table.ui.celled.table
					thead
						tr
							th Name
							th Brand
							th Engine
							th Power
							th Actions
					tbody
						template(v-if='cars.length == 0')
							tr
								td No cars found
								td
								td
								td
								td
						template(v-else)
							tr(v-for='car in cars' :key='car._id')
								td {{ car.name }}
								td {{ car.brand }}
								td {{ car.engine }}
								td {{ car.power }}
								td
									nuxt-link(:to='{ name: "cars-edit-id", params: { id: car._id } }')
										i.edit.icon
									a(@click='deleteCar(car._id)')
										i.trash.outline.icon

			.container__footer
				.ui.buttons.mini
					button.ui.button(:class='{ blue: currentPage == 1 }' @click='getCars(1, 10); setPage(1)') 1
					button.ui.button(:class='{ blue: currentPage == 2 }' @click='getCars(2, 10); setPage(2)') 2
					button.ui.button(:class='{ blue: currentPage == 3 }' @click='getCars(3, 10); setPage(3)') 3
					button.ui.button(:class='{ blue: currentPage == 4 }' @click='getCars(4, 10); setPage(4)') 4
					button.ui.button(:class='{ blue: currentPage == 5 }' @click='getCars(5, 10); setPage(5)') 5
</template>

<script>
import CarsService from '@/services/CarsService'
import Noty from 'noty'

export default {

	data() {
		return {
			search: '',
			currentPage: 1,
			cars: []
		}
	},

	computed: {
		filteredCars() {
			return this.cars.filter(car => {
				return car.name.toLowerCase().includes(this.search.toLowerCase()) || car.brand.toLowerCase().includes(this.search.toLowerCase()) || car.engine.toLowerCase().includes(this.search.toLowerCase()) || car.power.toString().includes(this.search.toString())
			})
		}
	},

	created() {
		this.getCars(1, 10);
	},

	methods: {

		async getCars(page, limit) {

			try {
				const response = await CarsService.findAll({
					page: page,
					limit: limit
				});

				this.cars = response.data.cars;
			}

			catch(error) {
				console.log(error);
			}

		},

		async deleteCar(id) {

			try {
				const response = await CarsService.delete(id);

				if (response.data.status == 'Success') {
					new Noty({
						type: 'success',
						text: 'Successfully deleted',
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

				this.getCars();
			}

			catch(error) {
				console.log(error);
			}

		},

		setPage(page) {
			this.currentPage = page;
		}
	}
}
</script>

<style>
</style>
