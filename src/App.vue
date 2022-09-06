<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" >Home</router-link>
                </li>
                <li class="nav-item">
                    <!-- barang categories -->
                    <router-link :to="{ name: 'barang-categories'}" class="nav-link" active-class="active" >Barang Categories</router-link>
                </li>
                <div v-if="currentUser" class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <router-link to="/profile" class="nav-link">
                        <font-awesome-icon icon="user" />
                        {{ currentUser.username }}
                    </router-link>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" @click.prevent="logout">
                        <font-awesome-icon icon="sign-out-alt" /> LogOut
                    </a>
                    </li>
                </div>
            </ul>
        </div>
    </nav>
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
    name: "app",
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<style>

</style>