<template>
    <form>
        <label for="add-task-input">{{this.taskNameLabel}}</label>
        <input v-model="taskName" type="text" :placeholder="taskNamePlaceholder" id="add-task-input">
        <label for="add-task-textarea">{{this.descriptionLabel}}</label>
        <textarea v-model="description" rows="4" :placeholder="descriptionPlaceholder" id="add-task-textarea"></textarea>
        <button @click="addTask">
            Add task
        </button>
    </form>
</template>

<script>
import tasks from '@/tasks.json'

export default {
    created() {
        if (!this.loggedProfile.isLogged) {
            this.$router.push('/')
        }
    },
    props: ['loggedProfile'],
    data() {
        return {
            taskName: '',
            description: '',
            taskNamePlaceholder: 'Task Name...',
            taskNameLabel: 'Task Name:',
            descriptionPlaceholder: 'Description...',
            descriptionLabel: 'Description:',
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
        addTask() {
            const newTask = {
                id: this.tasks.length + 1,
                task_name: this.taskName,
                description: this.description,
                user_id: this.loggedProfile.id,
                done: false
            }

            this.tasks.push(newTask)
            let localStorageData = JSON.parse(localStorage.getItem('data'))
            localStorageData[1] = this.tasks
            localStorageData = JSON.stringify(localStorageData)
            localStorage.setItem('data', localStorageData)

        }
    }
}
</script>