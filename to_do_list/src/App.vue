<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <div id="app">
    <input v-model="username" @input="searchProfile">
    <button @click="searchProfile">Search</button>
    <ul>
      <li v-for="(profile, index) in this.result" :key="index">{{ profile.username }}</li>
    </ul>
  </div>
</template>

<script>
import profiles from './profiles.json'

export default {
  data () {
    return {
      result: []
    }
  },
  methods: {
    searchProfile () {
      profiles.forEach(profile => {
        if (profile.username.includes(this.username)) {
          this.result.push(profile)
        }
      })
      return this.result
    }
  }
}

</script>
