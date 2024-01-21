<template>
  <template v-if="this.loggedProfile.isLogged" class="task-container">
    <transition-group tag="ol" class="task-container" name="list" appear>
      <li class="task" v-for="(task, index) in this.tasks" :key="task.id" :index="index">
        <p class="task-info">
          <span class="task-number">{{ index + 1 }}.</span>
        <div class="task-name" @click="toggleDescription(index + 1)">{{ task.task_name }}</div>
        <input type="checkbox" v-model="task.done" @click="this.markDone(task.id)" class="done-task">
        </p>
        <transition name="toast">
          <p v-if="this.showDescription === index + 1" class="description">{{ task.description }}</p>
        </transition>
      </li>
    </transition-group>
  </template>
  <h1 id="sign" v-else>
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
      showDescription: 0
    }
  },
  methods: {
    getTasks() {
      let updatedTasks = JSON.parse(localStorage.getItem("data"))[1].length === 0
        ? tasks
        : JSON.parse(localStorage.getItem("data"))[1];

      updatedTasks = updatedTasks.filter(task => task.user_id === this.loggedProfile.id && !task.done)
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
      this.tasks = this.getTasks()
    },
    toggleDescription(index) {
      if (this.showDescription === index) {
        this.showDescription = 0
        return this.showDescription
      }

      this.showDescription = index
      return this.showDescription
    }
  }
}
</script>
