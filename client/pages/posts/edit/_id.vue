<template lang='pug'>
	section.section
		.container
			.container__header
				h1 Edit {{ title }}
			.container__main
				form.ui.form
					.field
						label Title
						input(type='text' v-model='title')
					.field
						label Body
						input(type='text' v-model='body')
					button(class='ui button' @click.prevent='updatePost($event)') Save
</template>

<script>
import PostsService from '@/services/PostsService'
import Notification from '@/mixins/Notification'

export default {

	data() {
		return {
			title: '',
			body: ''
		}
	},

	mixins: [ Notification ],

	created() {
		this.getPost()
	},

	methods: {

		async getPost() {

			let id = this.$route.params.id

			try {
				const response = await PostsService.findOne(id)

				this.title = response.data.title
				this.body = response.data.body
			}

			catch(error) {
				console.log(error)
			}

		},

		async updatePost(event) {

			let id = this.$route.params.id,
				data = {
					title: this.title,
					body: this.body
				};

			let $currTarget = event.currentTarget

			$currTarget.classList.add('loading')

			try {
				const response = await PostsService.update(id, data)

				setTimeout(() => {
					$currTarget.classList.remove('loading')
				}, 300)

				if (response.data == 'Not Valid') {
					this.errorHandler()
				} else {
					this.successHandler()
				}

			} catch (error) {

				setTimeout(() => {
					$currTarget.classList.remove('loading')
				}, 300)

				this.errorHandler()
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
