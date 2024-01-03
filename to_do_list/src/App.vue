<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="" @click='logout' v-if="isLogged" :isLogged="isLogged">Log out</router-link>
    <div v-else id="loginRegister">
    <router-link to="/register" :isLogged="isLogged">Register</router-link> |
    <router-link to="/login">Login</router-link>
    </div>
  </nav>
    <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

li {
  list-style-type: none;
}

form {
  display: grid;
  width: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%)
}

input, button {
  padding: 5px;
  margin: 5px;
}

#search {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}

#logout {
    position: absolute;
    top: 42.5%;
    left: 50%;
    transform: translate(-50%);
}

#loginRegister {
  display: inline;
}

</style>

<script>
export default {
  data () {
    return {
      isLogged: localStorage.getItem('id') !== null
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.isLogged = false
    }
  }
}
</script>
