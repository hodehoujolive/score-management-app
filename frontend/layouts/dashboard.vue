<template>
	<v-app dark>
		<v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
			<v-list>
				<v-list-item
					v-for="(drawerLink, index) in drawerLinks"
					:key="index"
					:to="drawerLink.to"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ drawerLink.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="drawerLink.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar :clipped-left="clipped" fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />

			<ToolbarBrandLogo class="mx-5" />
			<v-toolbar-title v-text="brandName" />

			<v-spacer />

			<template v-if="$auth.loggedIn">
				<v-toolbar-items>
					<v-menu offset-y>
						<template #activator="{ on, attrs }">
							<v-btn
								depressed
								v-bind="attrs"
								class="text-none"
								v-on="on"
							>
								<v-avatar class="mr-4" size="40">
									<img
										src="https://cdn.vuetifyjs.com/images/john.jpg"
										:alt="`${$auth.user.name}'s avatar`"
									/>
								</v-avatar>

								{{ $auth.user.name }}
							</v-btn>
						</template>
						<v-list dense>
							<v-list-item
								v-for="(userLink, index) in userLinks"
								:key="index"
								link
								:to="userLink.to"
								class="align-center"
							>
								<v-list-item-action class="mr-3">
									<v-icon>{{ userLink.icon }}</v-icon>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title
										v-text="userLink.title"
									/>
								</v-list-item-content>
							</v-list-item>

							<v-list-item link @click="$auth.logout()">
								<v-list-item-action class="mr-3">
									<v-icon>mdi-logout</v-icon>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title v-text="'Logout'" />
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar-items>
			</template>
		</v-app-bar>

		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>

		<AppFooter :brand-name="'Score Management App'" />
	</v-app>
</template>

<script>
import appConfig from '~~/config/appConfig'

export default {
	name: 'DefaultLayout',
	middleware: ['auth'],
	data() {
		return {
			clipped: true,
			drawer: false,
			fixed: true,
			userLinks: [
				{
					icon: 'mdi-account',
					title: 'Profile',
					to: '/profile',
				},
				{
					icon: 'mdi-cog',
					title: 'Settings',
					to: '/',
				},
			],
			drawerLinks: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/',
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Dashboard',
					to: '/dashboard',
				},
			],
			brandName: appConfig.app.name,
			logoutLoading: false,
		}
	},
}
</script>
