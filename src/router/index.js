import { createRouter, createWebHistory } from 'vue-router'
import Authors from '../views/Authors.vue'
import Books from '../views/Books.vue'

const routes = [
  {
    path: '/',
    redirect: '/authors'
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
