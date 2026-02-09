import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import JobsView from '../views/JobsView.vue'
import JobDetailView from '../views/JobDetailView.vue'
import { useAuthStore } from '../stores/auth'

// Define routes (views don't exist yet, but will be created shortly)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/jobs/:id',
      name: 'job-details',
      component: JobDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      redirect: '/jobs'
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/jobs')
  } else {
    next()
  }
})

export default router
