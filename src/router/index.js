import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', //Страница авторизации
      name: 'home',
      component: () => import('../views/AuthorizationPage.vue')
    },
    {
      path: '/profile', //Страница профиля
      name: 'profile',
      component: () => import('../views/ProfilePage.vue')
    },
    {
        path: '/notification', //Страница уведомлений
        name: 'notification',
        component: () => import('../views/NotificationPage.vue')
    },
    {
        path: '/notificationEdit', //Страница редактирования уведомлений
        name: 'notificationEdit',
        props: true,
        component: () => import('../views/NotificationEditPage.vue')
    },
    {
        path: '/training', //Страница обучения
        name: 'training',
        component: () => import('../views/TrainingPage.vue')
    },
    {
        path: '/development', //Страница план графика
        name: 'development',
        component: () => import('../views/DevelopmentPage.vue')
    },
    {
        path: '/developmentEdit', //Страница редактирования план графика
        name: 'developmentEdit',
        component: () => import('../views/DevelopmentEditPage.vue')
    },
    {
        path: '/statement', //Страница ведомости
        name: 'statement',
        component: () => import('../views/StatementPage.vue')
    },
    {
        path: '/statementEdit', //Страница редактирования ведомости
        name: 'statementEdit',
        component: () => import('../views/StatementEditPage.vue')
    },
    {
        path: '/admin', //Страница админки
        name: 'admin',
        component: () => import('../views/AdminPage.vue')
    },
  ]
})

export default router
