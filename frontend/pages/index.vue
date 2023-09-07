<template>
	<div>
		<h1 class="display-1 font-weight-light">
			Welcome, {{ auth.user.name }}
		</h1>
	</div>
</template>

<script>
export default {
	name: 'IndexPage',
	layout: 'dashboard',
	head: () => ({
		title: 'Welcome',
	}),
	computed: {
		auth() {
			return this.$auth
		},
	},
}
</script>
