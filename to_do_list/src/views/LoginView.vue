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
    profiles = JSON.parse(localStorage.getItem('profiles'))
    
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
      profiles = JSON.parse(localStorage.getItem('profiles'))

      profiles.forEach((profile) => {
        if (profile.username === this.username) {
          if (profile.password === this.password) {
            profile.isLogged = true

            profiles = JSON.stringify(profiles)
            localStorage.setItem('profiles', profiles)

            this.isLogged = true;
          } 
        } 
      });
    },
  },
};
</script>
