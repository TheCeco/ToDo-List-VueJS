<template>
    <table>
        <tr>
          <th>Task num</th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Done</th>
        </tr>
        <template v-for="task in this.tasks" :key="task.id">
          <tr v-if="task.user_id === this.loggedProfile.id && task.done">
            <td>{{ task.id }}</td>
            <td>{{ task.task_name }}</td>
            <td>{{ task.description }}</td>
            <td><input type="checkbox" v-model="task.done" @click="this.markDone(task.id)" class="disabled"></td>
          </tr>
        </template>
      </table>
</template>

<style>
.disabled {
    pointer-events: none;
}
</style>

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