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
                path: 'section', //Страница секций
                component: () => import('../components/AdminSection.vue')
            },
            {
                path: 'directions', //Страница дирекций
                component: () => import('../components/AdminDirection.vue')
            },
            {
                path: 'companies', //Страница предприятий
                component: () => import('../components/AdminCompany.vue')
            },
            {
                path: 'professions', //Страница профессий
                component: () => import('../components/AdminProfession.vue')
            },
            {
                path: 'users', //Страница пользователей
                redirect: '/admin/users/all',
                children: [
                    {
                        path: 'all', //Всех
                        component: () => import('../components/AdminUser.vue')
                    },
                    {
                        path: 'edit/:id', //Редактирование
                        component: () => import('../components/AdminUserEdit.vue')
                    }
                ]
            },
            {
                path: 'roles', //Страница ролей
                component: () => import('../components/AdminRoles.vue')
            },
            {
                path: 'permission/:id', //Страница прав
                component: () => import('../components/AdminPermission.vue')
            },
            {
                path: 'positions', //Страница должностей
                component: () => import('../components/AdminPosition.vue')
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
