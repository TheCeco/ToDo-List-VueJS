<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="" @click="logout" v-if="isLogged">
    Log out
    </router-link>
    <div v-else id="loginRegister">
      <router-link to="/register">Register</router-link> |
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
  transform: translate(-50%);
}

input,
button {
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
import profiles from '@/profiles.json'

export default {
  created () {
    if (localStorage.getItem('profiles') === null) {
      profiles.forEach((profile) => {
        const profileData = {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          password: profile.password,
          isLogged: profile.isLogged
        }
        this.storedData.push(profileData)
      })

      this.storedData = JSON.stringify(this.storedData)

      localStorage.setItem('profiles', this.storedData)
    }
    profiles = JSON.parse(localStorage.getItem('profiles'))
  },
  data () {
    return {
      isLogged: this.loggedProfile(),
      storedData: []
    }
  },
  methods: {
    loggedProfile() {
      profiles = JSON.parse(localStorage.getItem('profiles')) === null ? profiles : JSON.parse(localStorage.getItem('profiles'))

      return profiles.some(profile => profile.isLogged);
    },
    logout () {
      profiles = JSON.parse(localStorage.getItem('profiles')) === null ? profiles : JSON.parse(localStorage.getItem('profiles'))

      profiles.forEach(profile => {
        profile.isLogged = false
      })

      profiles = JSON.stringify(profiles)
      localStorage.setItem('profiles', profiles)

      this.isLogged = false
    }
  }
}
</script>
