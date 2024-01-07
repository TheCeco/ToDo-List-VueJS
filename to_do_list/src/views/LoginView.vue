<template>
  <form>
    <input type="text" v-model="username" :placeholder="usernamePlaceholder" />
    <input
      v-model="password"
      type="password"
      :placeholder="passwordPlaceholder"
    />
    <button
      @click.prevent.stop="loginProfile"
      @keyup.enter.prevent.stop="loginProfile"
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
      profiles: profiles,
      username: "",
      password: "",
      usernamePlaceholder: "Username",
      passwordPlaceholder: "Password",
    };
  },
  methods: {
    loginProfile() {
      this.profiles.forEach((profile) => {
        if (profile.username === this.username) {
          if (profile.password === this.password) {
            localStorage.setItem("user_id", profile.id);

            this.isLogged = true;

            this.$router.push("/");
          } else {
            alert("Wrong password!");
          }
        } else {
          alert("No such username!");
        }
      });
    },
  },
};
</script>
