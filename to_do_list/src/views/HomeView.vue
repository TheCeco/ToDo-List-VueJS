<template>
  <table v-if="this.loggedProfile.isLogged">
    <tr>
      <th>Task num</th>
      <th>Task Name</th>
      <th>Description</th>
      <th>Done</th>
    </tr>
    <template v-for="task in this.tasks" :key="task.id">
      <tr v-if="task.user_id === this.loggedProfile.id && !task.done">
        <td>{{ task.id }}</td>
        <td>{{ task.task_name }}</td>
        <td>{{ task.description }}</td>
        <td><input type="checkbox" v-model="task.done" @click="this.markDone(task.id)"></td>
      </tr>
    </template>
  </table>
  <h1 v-else>
    You must be signed in!
  </h1>
</template>

<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
}
</style>

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
      tasks: this.getTasks()
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
    }
  }
}
</script>
