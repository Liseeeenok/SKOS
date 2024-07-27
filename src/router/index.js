import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/', //Страница авторизации
        name: 'authotrization',
        component: () => import('../views/AuthorizationPage.vue')
    },
    {
        path: '/notification', //Страница уведомлений
        name: 'notification',
        redirect: '/notification/all',
        children: [
            {
                path: 'all', //Страница редактирования уведомлений
                component: () => import('../components/Notification.vue')
            },
            {
                path: 'edit/:id', //Страница редактирования уведомлений
                component: () => import('../components/NotificationEdit.vue')
            }
        ]
    },
    {
      path: '/profile', //Страница профиля
      name: 'profile',
      component: () => import('../components/Profile.vue')
    },
    {
        path: '/admin', //Страница админки
        name: 'admin',
        redirect: '/admin/division',
        component: () => import('../components/Admin.vue'),
        children: [
            {
                path: 'division', //Страница подразделений
                component: () => import('../components/AdminDivision.vue')
            },
            {
                path: 'section', //Страница дирекций
                component: () => import('../components/AdminSection.vue')
            },
        ]
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
  ]
})

export default router
