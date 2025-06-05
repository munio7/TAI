import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TutorsCatalogView from '@/views/TutorsCatalogView.vue'
import SignUpLoginView from '@/views/SignUpLoginView.vue'
import UserPanelView from '@/views/UserPanelView.vue'
import StudentsView from '@/views/StudentsView.vue'
import CalendarView from '@/views/CalendarView.vue'
import RegisterTutorView from '@/views/RegisterTutorView.vue'
import TutorProfileView from '@/views/TutorProfileView.vue'
import TutorProfileByIdView from '@/views/TutorProfileByIdView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalog/',
      name: 'catalog',
      component: TutorsCatalogView,
    },
    {
      path: '/who-are-you/:activePage',
      name: 'who-are-you',
      component: SignUpLoginView,
    },
    {
      path: '/profile/start',
      name: 'start',
      component: UserPanelView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterTutorView,
    },
    {
      path: '/profile/students',
      name: 'students',
      component: StudentsView,
    },
    {
      path: '/profile/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/profile/me',
      name: 'me',
      component: TutorProfileView
    },
    {
    path: '/teacher/:id',
    name: 'TeacherProfile',
    component: TutorProfileByIdView,
    props: true // allows you to use the `id` as a prop in the component
  }
    
  ],
})

export default router
