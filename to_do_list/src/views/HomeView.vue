<template>
  <div class="home">
    <div id="search">
      <table>
        <tr>
          <th>Task &num</th>
          <th>Task Name</th>
          <th>Description</th>
        </tr>
        <tr v-for="task in this.tasks" :key="task.id">
          <td v-if="task.user_id === this.loggedProfile.id">{{task.id}}</td>
          <td v-if="task.user_id === this.loggedProfile.id">{{task.task_name}}</td> 
          <td v-if="task.user_id === this.loggedProfile.id">{{task.description}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
table, th, td {
  border: 1px solid black; 
  border-collapse: collapse;
}

th, td {
  padding: 15px;
}
</style>

<script>
import profiles from '@/profiles.json'
import tasks from '@/tasks.json'

export default {
  name: 'HomeView',
  created () {
      let localStorageData = JSON.parse(localStorage.getItem('data'))
      profiles = localStorageData[0]

      if (!profiles.some(profile => profile.isLogged)) {
        this.$router.push('/')
      }
  },
  data () {
    return {
      loggedProfile: this.getLoggedProfile(),
      tasks: tasks,
      localStorageData: JSON.parse(localStorage.getItem('data'))
    }
  },
  methods: {
    getLoggedProfile () {
      let localStorageData = JSON.parse(localStorage.getItem('data'))
      profiles = localStorageData[0]
      
      this.loggedProfile = {}

      profiles.forEach(profile => {
        if (profile.isLogged) {
          this.loggedProfile =  profile
        }
      })
      return this.loggedProfile
    },
  }
}
</script>
