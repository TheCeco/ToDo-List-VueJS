<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
    <form v-if="!isLogged">
      <input v-model="username" type="text" placeholder="Username"/>
      <input v-model="email" type="email" placeholder="Email"/>
      <input v-model="password" type="password" placeholder="Password"/>
      <input v-model="rePassword" type="password" placeholder="Repeat Password"/>
      <button
      @click.prevent.stop="registerProfile"
      @keyup.enter.prevent.stop="registerProfile">
      Register
      </button>
    </form>
    <div id="search">
      <input v-model="search" @input="searchProfile">
      <button @click="searchProfile">Search</button>
      <ul>
        <li v-for="(profile, index) in this.result" :key="index">{{ profile.username }}</li>
      </ul>
      <p v-if="this.result.length === 0 && !searchPerformed">No results</p>
    </div>
    <div id="logout">
    <button @click='logout' v-if="isLogged">Log out</button>
    </div>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}

#logout {
    position: absolute;
    top: 42.5%;
    left: 50%;
    transform: translate(-50%);
}

</style>

<script>
import profiles from './profiles.json'

export default {
  data () {
    return {
      profiles: profiles,
      result: [],
      searchPerformed: false,
      username: '',
      password: '',
      rePassword: '',
      email: '',
      search: '',
      newProfile: {
        id: null,
        username: '',
        password: '',
        email: ''
      },
      isLogged: localStorage.getItem('id') !== null
    }
  },
  methods: {
    searchProfile () {
      this.result = []

      this.profiles.forEach(profile => {
        if (profile.username.includes(this.search)) {
          this.result.push(profile)
        }
      })

      this.searchPerformed = true

      if (this.result.length === 0) {
        this.searchPerformed = false
      }
    },
    registerProfile () {
      this.profiles.forEach(profile => {
        if (profile.username === this.username) {
          alert('Already profile with that username!')
        }
      })

      if (this.password === this.rePassword) {
        this.newProfile.id = this.profiles.length + 1
        this.newProfile.username = this.username
        this.newProfile.password = this.password
        this.newProfile.email = this.email

        this.profiles.push(this.newProfile)

        localStorage.setItem('id', this.newProfile.id)

        this.newProfile = {
          id: null,
          username: '',
          password: '',
          email: ''
        }

        console.log(this.profiles)

        this.username = ''
        this.password = ''
        this.rePassword = ''
        this.email = ''

        this.isLogged = true

        alert('Profile is created')
      } else {
        alert('Password are not the same')
      }
    },
    logout () {
      localStorage.clear()
      this.isLogged = false
    }
  }
}

</script>
