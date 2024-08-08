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
            {
                path: 'notificationPlan', //Страница должностей
                component: () => import('../components/AdminNotification.vue')
            },
        ]
    },
    {
        path: '/training', //Страница обучения
        redirect: '/training/all',
        children: [
            {
                path: 'all', //Главное меню
                component: () => import('../components/Training.vue')
            },
            {
                path: 'development', //Страница план графика
                redirect: '/training/development/view',
                children: [
                    {
                        path: 'view', //Просмотр
                        component: () => import('../components/Development.vue')
                    },
                    {
                        path: 'edit', //Редактор
                        component: () => import('../components/DevelopmentEdit.vue')
                    },
                ]
            },
            {
                path: 'statement', //Страница ведомости
                redirect: '/training/statement/view',
                children: [
                    {
                        path: 'view', //Просмотр
                        component: () => import('../components/Statement.vue')
                    },
                    {
                        path: 'edit', //Редактор
                        component: () => import('../components/StatementEdit.vue')
                    },
                ]
            },
        ]
    },
    {
        path: '/none', //Главное меню
        component: () => import('../components/Error.vue')
    },
  ]
})

export default router
