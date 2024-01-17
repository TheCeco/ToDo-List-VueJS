<template>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/add_task" v-if="this.loggedProfile.isLogged">Add Task</router-link>
      <span v-if="this.loggedProfile.isLogged"> | </span>
      <router-link to="/done_tasks" v-if="this.loggedProfile.isLogged">Done Tasks</router-link>
      <router-link to="/login" v-if="!this.loggedProfile.isLogged">Login</router-link>
      |
      <router-link to="/register" v-if="!this.loggedProfile.isLogged">Register</router-link>
      <router-link to="" @click="logout" v-if="this.loggedProfile.isLogged">Log out</router-link>
    </nav>
  <div class="home">
    <router-view :loggedProfile="this.loggedProfile"></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

li {
  list-style-type: none;
}

form {
  display: grid;
  width: 50%;
}

input,
button {
  padding: 5px;
  margin: 5px;
}

#loginRegister {
  display: inline;
}

.home {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import profiles from "@/profiles.json";
import HomeView from "./views/HomeView.vue";

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
  components: {
    HomeView
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
