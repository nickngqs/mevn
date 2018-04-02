<template lang='pug'>
	.navigation
		.navigation__links
			nuxt-link(to='/') Home
			nuxt-link(to='/cars') Cars
			nuxt-link(to='/posts') Posts
</template>

<style lang='scss'>
.navigation {
	height: 50px;
	background-color: #5c7cfa;
}

.navigation__links {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;

	a {
		color: white;
		margin-right: 10px;
		margin-left: 10px;

		font-size: 16px;
	}
}
</style>
