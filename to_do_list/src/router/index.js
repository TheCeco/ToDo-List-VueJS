import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import AddTaskView from '@/views/AddTaskView.vue'
import DoneTasksView from '@/views/DoneTasksView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/add_task',
    name: 'add_task',
    component: AddTaskView
  },
  {
    path: '/done_tasks',
    name: 'done_tasks',
    component: DoneTasksView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
