import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDo from '../views/ToDo'

const load = (component) => () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'todo-list',
    component: ToDo
  },
  {
    path: '/recycle-bin',
    name: 'recycle-bin',
    component: load('RecycleBin')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
