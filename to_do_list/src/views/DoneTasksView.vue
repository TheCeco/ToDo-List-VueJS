<template>
  <ol v-if="this.loggedProfile.isLogged" class="task-container">
    <template v-for="task in this.tasks" :key="task.id">
      <li v-if="task.user_id === this.loggedProfile.id && task.done" class="task">
          <p @click="this.toggleDescription" class="task-info">
            <span class="task-number">{{ task.id }}</span>
            <div class="task-name" @click="toggleDescription">{{ task.task_name }}</div>
            <input type="checkbox" v-model="task.done" @click="this.markDone(task.id)" class="done-task star-checkbox">
          </p>
        <p v-if="this.showDescription">{{ task.description }}</p>
      </li>
    </template>
  </ol>
</template>

<script>
export default {
    props: ['loggedProfile'],
    data() {
        return {
            tasks: JSON.parse(localStorage.getItem('data'))[1]
        }
    }
}
</script>