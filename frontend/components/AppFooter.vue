<template>
	<v-footer app padless>
		<v-col class="text-center" cols="12">
			{{ new Date().getFullYear() }} — <strong>{{ brandName }}</strong>
		</v-col>
	</v-footer>
</template>

<script>
export default {
	name: 'AppFooter',
	props: {
		fixed: {
			type: Boolean,
			required: false,
			default: false,
		},
		brandName: {
			type: String,
			required: true,
			default: 'Brand Name',
		},
	},
}
</script>

<style scoped></style>
