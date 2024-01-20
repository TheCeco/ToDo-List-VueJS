<template>
  <form>
    <label for="login-username-input">{{this.usernameLabel}}</label>
    <input id="login-username-input" type="text" v-model="username" :placeholder="usernamePlaceholder" />
    <label for="login-password-input">{{this.passwordLabel}}</label>
    <input
      id="login-password-input"
      v-model="password"
      type="password"
      :placeholder="passwordPlaceholder"
    />
    <button @click="loginProfile">
      Login
    </button>
  </form>
</template>

<script>
import profiles from "@/profiles.json";

export default {
  name: "LoginView",
  created () {
    let localStorageData = JSON.parse(localStorage.getItem('data'))
    profiles = localStorageData[0]
    
    if (profiles.some(profile => profile.isLogged)) {
      this.$router.push('/')
    }
  },
  data() {
    return {
      username: "",
      password: "",
      usernamePlaceholder: "Username...",
      passwordPlaceholder: "Password...",
      usernameLabel: "Username:",
      passwordLabel: "Password:",
    };
  },
  methods: {
    loginProfile() {
      let localStorageData = JSON.parse(localStorage.getItem('data'))
      profiles = localStorageData[0]

      profiles.forEach((profile) => {
        if (profile.username === this.username) {
          if (profile.password === this.password) {
            profile.isLogged = true

            localStorageData[0] = profiles
            localStorageData = JSON.stringify(localStorageData)
            localStorage.setItem('data', localStorageData)
          } 
        } 
      });
    },
  },
};
</script>
