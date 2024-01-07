<template>
  <form>
    <input type="text" v-model="username" :placeholder="usernamePlaceholder" />
    <input
      v-model="password"
      type="password"
      :placeholder="passwordPlaceholder"
    />
    <button
      @click="loginProfile"
      @keyup.enter="loginProfile"
    >
      Login
    </button>
  </form>
</template>

<script>
import profiles from "@/profiles.json";

export default {
  name: "LoginView",
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

            this.$router.push("/");
          } else {
            // console.log("Wrong password!");
          }
        } else {
          // console.log("No such username!");
        }
      });
    },
  },
};
</script>
