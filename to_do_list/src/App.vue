<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/add_task" v-if="isLogged">Add task</router-link>
    <router-link to="/login" v-if="!isLogged">Login</router-link>
    |
    <router-link to="/register" v-if="!isLogged">Register</router-link>
    <router-link to="" @click="logout" v-if="isLogged">Log out</router-link>
  </nav>
  <router-view></router-view>
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
  left: 50%;
  transform: translate(50%);
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
import tasks from "@/tasks.json"

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
      isLogged: this.loggedProfile(),
      storedData: [[], []]
          
    };
  },
  methods: {
    loggedProfile() {
      profiles =
        JSON.parse(localStorage.getItem("data")) === null
          ? profiles
          : JSON.parse(localStorage.getItem("data"))[0];

      return profiles.some((profile) => profile.isLogged);
    },
    logout() {
      profiles =
        JSON.parse(localStorage.getItem("data")) === null
          ? profiles
          : JSON.parse(localStorage.getItem("data"))[0];

      profiles.forEach((profile) => {
        profile.isLogged = false;
      });
      profiles = JSON.stringify(profiles);
      localStorage.setItem("profiles", profiles);

      this.isLogged = false;

      console.log("logged out");
    },
  },
};
</script>
