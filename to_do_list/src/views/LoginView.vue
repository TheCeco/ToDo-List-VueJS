<template>
  <form>
    <input type="text" v-model="username" :placeholder="usernamePlaceholder" />
    <input
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
      usernamePlaceholder: "Username",
      passwordPlaceholder: "Password",
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
