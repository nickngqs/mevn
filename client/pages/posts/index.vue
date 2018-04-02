<template lang='pug'>
	section
		.container
			.container__header
				h1 Posts

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
							th ID
							th Title
							th Body
							th Created At
					tbody
						template(v-if='posts.length == 0')
							tr
								td No posts found
								td
								td
								td
								td
						template(v-else)
							tr(v-for='post in posts' :key='post.id')
								td {{ post.id }}
								td {{ post.title }}
								td {{ post.body }}
								td {{ post.created_at }}

			.container__footer
				.ui.buttons.mini
					button.ui.button(:class='{ blue: currentPage == 1 }' @click='getCars(1, 10); setPage(1)') 1
					button.ui.button(:class='{ blue: currentPage == 2 }' @click='getCars(2, 10); setPage(2)') 2
					button.ui.button(:class='{ blue: currentPage == 3 }' @click='getCars(3, 10); setPage(3)') 3
					button.ui.button(:class='{ blue: currentPage == 4 }' @click='getCars(4, 10); setPage(4)') 4
					button.ui.button(:class='{ blue: currentPage == 5 }' @click='getCars(5, 10); setPage(5)') 5
</template>

<script>
import PostsService from '@/services/PostsService'
import Noty from 'noty'

export default {

	data() {
		return {
			search: '',
			currentPage: 1,
			posts: []
		}
	},

	created() {
		this.getPosts(1, 10);
	},

	methods: {

		async getPosts(page, limit) {

			try {
				const response = await PostsService.findAll();

				this.posts = response.data;

				console.log(response);
			}

			catch(error) {
				console.log(error);
			}

		},

		async deleteCar(id) {

			console.log('Delete Car');

		},

		setPage(page) {
			this.currentPage = page;
		}
	}
}
</script>

<style>
</style>
