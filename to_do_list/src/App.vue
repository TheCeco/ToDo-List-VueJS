<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <input v-model="username">
  <button @click="searchProfile">Search</button>
</template>

<script>
import profiles from './profiles.json'

export default {
  data () {
    return {
      profiles: profiles
    }
  },
  methods: {
    searchProfile () {
      profiles.forEach(profile => {
        if (profile.username.includes(this.username)) {
          console.log(profile)
        }
      })
    }
  }
}

</script>
