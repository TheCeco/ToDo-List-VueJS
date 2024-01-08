<template>
  <div class="home">
    <div id="search">
      <ul>
        <li v-for="task in this.tasks" v-if="task.user_id === this.loggedProfile.id" :key="task.id">
          {{ task.task_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import profiles from '@/profiles.json'
import tasks from '@/tasks.json'

export default {
  name: 'HomeView',
  data () {
    return {
      storedData: [],
      result: [],
      search: '',
      searchPerformed: false,
      loggedProfile: this.getLoggedProfile(),
      tasks: tasks
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
