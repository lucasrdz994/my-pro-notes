<template>
  <div>
    <b-navbar :active="$route.path === '/'">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="~/static/logo.jpg"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">

          <b-navbar-dropdown :arrowless="true" v-if="currentUser">
            <template slot="label">
                <b-icon type="is-dark" icon="account-circle-outline" class="mr-2"></b-icon>
                <strong>{{ currentUser.user_metadata.full_name }}</strong>
            </template>
            <b-navbar-item tag="nuxt-link" to="/notes">
              Mis notas
            </b-navbar-item>
            <b-navbar-item @click="logout">
              Cerrar sesión
            </b-navbar-item>
          </b-navbar-dropdown>

          <div class="buttons" v-else>
            <b-button @click="signup" type="is-primary">Crear cuenta</b-button>
            <b-button @click="login" type="is-text">Iniciar sesión</b-button>
          </div>


        </b-navbar-item>
      </template>
    </b-navbar>

    <Nuxt />

  </div>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'
netlifyIdentity.init({ locale: 'es' });

import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setCurrentUser']),
    identityPopUp() {
      netlifyIdentity.open('login'); // open the modal to the login tab
    },
    logout() {
      netlifyIdentity.logout()
      netlifyIdentity.on('logout', () => {
        this.setCurrentUser(null)
        this.$router.push('/')
      });
    },
    login() {
      netlifyIdentity.open('login');
      netlifyIdentity.on('login', user => {
        this.setCurrentUser(user)
        this.$router.push('/notes')
        netlifyIdentity.close();
      });
    },
    signup() {
      netlifyIdentity.open('signup')
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
};
</script>

<style scoped>
.dropdown-menu {
  left: none;
  right: 0;
  min-width: none;
  padding-top: 0;
}
</style>
