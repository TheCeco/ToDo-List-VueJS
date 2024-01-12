<template>
  <form>
    <input v-model="username" type="text" :placeholder="usernamePlaceholder" />
    <input v-model="email" type="email" :placeholder="emailPlaceholder" />
    <input
      v-model="password"
      type="password"
      :placeholder="passwordPlaceholder"
    />
    <input
      v-model="rePassword"
      type="password"
      :placeholder="rePasswordPlaceholder"
    />
    <button @click.prevent.stop="registerProfile">
      Register
    </button>
  </form>
</template>

<script>
import profiles from '@/profiles.json'
import { Profile } from '@/Profile.js'

export default {
  name: 'RegisterView',
  created () {
    let localStorageData = JSON.parse(localStorage.getItem('data'))
    profiles = localStorageData[0]
    
    if (profiles.some(profile => profile.isLogged)) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      username: '',
      password: '',
      rePassword: '',
      email: '',
      usernamePlaceholder: 'Username',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      rePasswordPlaceholder: 'Repeat Password',
    }
  },
  methods: {
    registerProfile () {
      let localStorageData = JSON.parse(localStorage.getItem('data'))
      profiles = localStorageData[0]

      profiles.forEach((profile) => {
        if (profile.username === this.username) {
          alert('Already profile with that username!')
        }
      })

      if (this.password === this.rePassword) {
        const profile = new Profile(
          profiles.length + 1,
          this.username,
          this.email,
          this.password,
          true
        )

        profiles.push(profile)
        
        localStorageData[0] = profiles
        localStorageData = JSON.stringify(localStorageData)
        localStorage.setItem('data', localStorageData)
      }
    }
  }
}
</script>
