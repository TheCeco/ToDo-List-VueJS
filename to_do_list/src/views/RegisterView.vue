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
    <button @click="registerProfile" @keyup.enter="registerProfile">
      Register
    </button>
  </form>
</template>

<script>
import profiles from '@/profiles.json'
import { Profile } from '@/Profile.js'

export default {
  name: 'RegisterView',
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
      storedData: [],
    }
  },
  methods: {
    async registerProfile () {
      profiles = JSON.parse(localStorage.getItem('profiles'))

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
        
        this.$router.push('/')
      } else {
        // alert('Password are not the same')
      }
    }
  }
}
</script>
