<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/add_task" v-if="this.loggedProfile.isLogged">Add Task</router-link>
    <span v-if="this.loggedProfile.isLogged"> | </span>
    <router-link to="/done_tasks" v-if="this.loggedProfile.isLogged">Done Tasks</router-link>
    <router-link to="/login" v-if="!this.loggedProfile.isLogged">Login</router-link>
    |
    <router-link to="/register" v-if="!this.loggedProfile.isLogged">Register</router-link>
    <router-link id="logout" to="" @click="logout" v-if="this.loggedProfile.isLogged">Log out</router-link>
  </nav>
  <div class="home">
    <div class="header">
      <span class="dot small"></span>
      <span class="dot average"></span>
      <span class="dot big"></span>
      <h1>To Do List</h1>
      <span class="dot big"></span>
      <span class="dot average"></span>
      <span class="dot small"></span>
    </div>
    <router-view :loggedProfile="this.loggedProfile"></router-view>
  </div>
</template>

<script>
import profiles from "@/profiles.json";

export default {
  created() {
    if (JSON.parse(localStorage.getItem("data")) === null) {
      profiles.forEach((profile) => {
        const profileData = {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          password: profile.password,
          isLogged: profile.isLogged,
        };
        this.storedData[0].push(profileData);
      });

      this.storedData = JSON.stringify(this.storedData);

      localStorage.setItem("data", this.storedData);
    }
    profiles = JSON.parse(localStorage.getItem("data"))[0];
  },
  data() {
    return {
      loggedProfile: this.getLoggedProfile(),
      storedData: [[], []],
    };
  },
  methods: {
    getLoggedProfile() {
      let localStorageData = JSON.parse(localStorage.getItem("data"))
      profiles =
        localStorageData === null
          ? profiles
          : localStorageData[0];

      let loggedProfile = '';

      profiles.forEach(profile => {
        if (profile.isLogged) {
          loggedProfile = profile
        }
      })

      return loggedProfile
    },
    logout() {
      let localStorageData = JSON.parse(localStorage.getItem("data"))
      profiles =
        localStorageData === null
          ? profiles
          : localStorageData[0];

      profiles.forEach((profile) => {
        profile.isLogged = false;
      });

      localStorageData[0] = profiles
      localStorageData = JSON.stringify(localStorageData)
      localStorage.setItem("data", localStorageData);

      location.reload()
    },
  },
};
</script>
