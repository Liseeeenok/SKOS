import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from '../views/AuthorizationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthorizationPage
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfilePage.vue')
    },
    {
        path: '/notification',
        name: 'notification',
        component: () => import('../views/NotificationPage.vue')
    },
    {
        path: '/editNotification',
        name: 'editNotification',
        props: true,
        component: () => import('../views/EditNotificationPage.vue')
    },
    {
        path: '/training',
        name: 'training',
        component: () => import('../views/TrainingPage.vue')
    },
    {
        path: '/preparation',
        name: 'preparation',
        component: () => import('../views/PreparationPage.vue')
    },
    {
        path: '/development',
        name: 'development',
        component: () => import('../views/DevelopmentPage.vue')
    },
    {
        path: '/developmentEdit',
        name: 'developmentEdit',
        component: () => import('../views/DevelopmentEditPage.vue')
    },
    {
        path: '/statement',
        name: 'statement',
        component: () => import('../views/StatementPage.vue')
    }
  ]
})

export default router
