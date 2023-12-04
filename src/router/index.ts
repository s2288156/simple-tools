import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/c',
      name: 'canvas',
      component: () => import('@/views/CanvasView.vue')
    },
    {
      path: '/d',
      name: 'canvas demo',
      component: () => import('@/views/DemoView.vue')
    }
  ]
})

export default router
