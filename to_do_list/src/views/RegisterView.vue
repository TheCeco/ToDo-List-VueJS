<template>
  <form>
    <label for="register-username-input">{{ this.usernameLabel }}</label>
    <input id="register-username-input" v-model="username" type="text" :placeholder="usernamePlaceholder" />
    <label for="register-email-input">{{ this.emailLabel }}</label>
    <input id="register-email-input" v-model="email" type="email" :placeholder="emailPlaceholder" />
    <label for="register-password-input">{{ this.passwordLabel }}</label>
    <input id="regsiter-password-input" v-model="password" type="password" :placeholder="passwordPlaceholder" />
    <label for="register-re-password-input">{{ this.rePasswordLabel }}</label>
    <input id="register-re-password-input" v-model="rePassword" type="password" :placeholder="rePasswordPlaceholder" />
    <button @click="registerProfile">
      Register
    </button>
  </form>
</template>

<script>
import profiles from '@/profiles.json'
import { Profile } from '@/Profile.js'

export default {
  name: 'RegisterView',
  created() {
    let localStorageData = JSON.parse(localStorage.getItem('data'))
    profiles = localStorageData[0]

    if (profiles.some(profile => profile.isLogged)) {
      this.$router.push('/')
    }
  },
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      email: '',
      usernamePlaceholder: 'Username...',
      emailPlaceholder: 'Email...',
      passwordPlaceholder: 'Password...',
      rePasswordPlaceholder: 'Repeat Password...',
      usernameLabel: 'Username:',
      emailLabel: 'Email:',
      passwordLabel: 'Password:',
      rePasswordLabel: 'Repeat Password:',
    }
  },
  methods: {
    registerProfile() {
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
