<template>
  <ol v-if="this.loggedProfile.isLogged" class="task-container">
    <template v-for="task in this.tasks" :key="task.id">
      <li v-if="task.user_id === this.loggedProfile.id && !task.done" class="task">
        <div class="task-info">
          <p @click="this.toggleDescription" class="task-name">
            <span class="task-number">{{ task.id }}</span>{{ task.task_name }}
            <input type="checkbox" v-model="task.done" @click="this.markDone(task.id)" class="done-task star-checkbox">
          </p>
        </div>
        <p v-if="this.showDescription">{{ task.description }}</p>
      </li>
    </template>
  </ol>
  <h1 v-else>
    You must be signed in!
  </h1>
</template>

<script>
import profiles from '@/profiles.json'
import tasks from '@/tasks.json'

export default {
  name: 'HomeView',
  created() {
    let localStorageData = JSON.parse(localStorage.getItem('data'))
    profiles = localStorageData[0]

    if (!profiles.some(profile => profile.isLogged)) {
      this.$router.push('/')
    }
  },
  props: ['loggedProfile'],
  data() {
    return {
      tasks: this.getTasks(),
      showDescription: false
    }
  },
  methods: {
    getTasks() {
      let updatedTasks = JSON.parse(localStorage.getItem("data"))[1].length === 0
        ? tasks
        : JSON.parse(localStorage.getItem("data"))[1];
      return updatedTasks
    },
    markDone(id) {
      let localStorageData = JSON.parse(localStorage.getItem('data'))
      tasks = localStorageData[1]

      tasks.forEach(task => {
        if (task.id === id) {
          task.done = true
        }
      });

      localStorageData[1] = tasks
      localStorageData = JSON.stringify(localStorageData)
      localStorage.setItem('data', localStorageData)
    },
    toggleDescription() {
      this.showDescription = !this.showDescription
      return this.showDescription
    }
  }
}
</script>
