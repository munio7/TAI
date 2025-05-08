import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TutorsCatalogView from '@/views/TutorsCatalogView.vue'
import SignUpLoginView from '@/views/SignUpLoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: TutorsCatalogView,
    },
    {
      path: '/who-are-you/:activePage',
      name: 'who-are-you',
      component: SignUpLoginView,
    },
  ],
})

export default router
