<template>
  <template v-if="this.loggedProfile.isLogged" class="task-container">
    <transition-group v-if="this.tasks.length > 0" tag="ol" class="task-container" name="list" appear>
      <li class="task" v-for="(task, index) in this.tasks" :key="task.id" :index="index">
        <p class="task-info">
          <span class="task-number">{{ index + 1 }}.</span>
        <div class="task-name" @click="toggleDescription(index + 1)">{{ task.task_name }}</div>
        <input type="checkbox" v-model="task.done" class="disabled done-task">
        </p>
        <transition name="toast">
          <p v-if="this.showDescription === index + 1" class="description">{{ task.description }}</p>
        </transition>
      </li>
    </transition-group>
    <h1 class="sign" v-else>
      No tasks are done!
    </h1>
  </template>
</template>

<script>
import { profiles } from '@/profiles.json'
import tasks from '@/tasks.json'

export default {
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

      updatedTasks = updatedTasks.filter(task => task.user_id === this.loggedProfile.id && task.done)
      return updatedTasks
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