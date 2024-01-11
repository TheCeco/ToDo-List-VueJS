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
      profiles = JSON.parse(localStorage.getItem('profiles'))

      if (!profiles.some(profile => profile.isLogged)) {
        this.$router.push('/')
      }
  },
  data () {
    return {
      storedData: [],
      result: [],
      search: '',
      searchPerformed: false,
      loggedProfile: this.getLoggedProfile(),
      tasks: tasks,
      showForm: false
    }
  },
  methods: {
    getLoggedProfile () {
      profiles = JSON.parse(localStorage.getItem('profiles'))
      this.loggedProfile = {}

      profiles.forEach(profile => {
        if (profile.isLogged) {
          this.loggedProfile =  profile
        }
      })
      return this.loggedProfile
    },
    searchProfile () {
      profiles = JSON.parse(localStorage.getItem('profiles'))

      this.result = []

      profiles.forEach((profile) => {
        if (profile.username.includes(this.search)) {
          this.result.push(profile)
        }
      })

      this.searchPerformed = true

      if (this.result.length === 0) {
        this.searchPerformed = false
      }
    }
  }
}
</script>
