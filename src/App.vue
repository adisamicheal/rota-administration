<template>
  <v-app>
    <nav-bar class="navbar"></nav-bar>
    <v-main class="main-view">
      <router-view/>
    </v-main>
    <v-snackbar
			v-model="getSnackbarData.showSnackbar"
			:color="getSnackbarData.color"
			:top="true"
			:right="true"
			:timeout="-1"
			>
			{{ getSnackbarData.text }}
			<v-btn
				dark
				flat
				@click="btnRefresh()"
				v-if="getSnackbarData.timeout === 0"
				>
			Refresh
			</v-btn>
		</v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import NavBar from './components/NavBar.vue';

export default Vue.extend({
  components: { NavBar },
  name: 'App',

  data: () => ({
    //
  }),
  created() {
		this.updateSnackbar({
			color: '',
			text: '',
			showSnackbar: false,
			timeout: null
		});
	},
	computed: {
		...mapGetters([
			'getSnackbarData'
		])
	},
  methods: {
		...mapMutations([
			'updateSnackbar'
		]),
		btnRefresh() {
			this.updateSnackbar({ showSnackbar: false });
		},
  }
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main-view {
  margin-top: 150px;
  @media screen and (max-width: 768px) {
    margin-top: 100px;
  }
}
</style>

