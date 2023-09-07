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

								{{ $auth.user.firstname }} {{ $auth.user.lastname }}
							</v-btn>
						</template>
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
	// middleware: ['auth'],
	data() {
		return {
			clipped: true,
			drawer: false,
			fixed: true,
			drawerLinks: [
				{
					icon: 'mdi-apps',
					title: 'Leaderboard',
					to: '/leaderboard',
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Matchs',
					to: '/matchs',
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Teams',
					to: '/teams',
				},
			],
			brandName: appConfig.app.name,
			logoutLoading: false,
		}
	},
}
</script>
