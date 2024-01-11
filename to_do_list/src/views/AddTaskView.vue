<template>
    <form>
        <input v-model="taskName" type="text" :placeholder="taskNamePlaceholder">
        <textarea v-model="description" rows="4" :placeholder="descriptionPlaceholder"></textarea>
        <button @click="addTask">
            Add task
        </button>
    </form> 
</template>

<script>
import tasks from '@/tasks.json'

export default {
    created () {
        
    },
    data () {
        return {
            taskName: '',
            description: '',
            taskNamePlaceholder: 'Task Name...',
            descriptionPlaceholder: 'Description...'
        }
    },
    methods: {
        addTask () {
            console.log('work')
        }
    }
}
</script>