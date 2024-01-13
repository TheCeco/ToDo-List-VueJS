<template>
  <div class="home">
    <div id="search">
      <table>
        <tr>
          <th>Task num</th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Done</th>
        </tr>
        <template v-for="(task, index) in this.tasks" :key="task.id" :index="index">
          <tr v-if="task.user_id === this.loggedProfile.id && !task.done">
            <td>{{ index }}</td>
            <td>{{ task.task_name }}</td>
            <td>{{ task.description }}</td>
            <td><input type="checkbox" v-model="task.done"></td>
          </tr>
        </template>
      </table>
    </div>
  </div>
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
    }
  }
}
</script>
