import { defineStore } from "pinia";
const date = new Date();

export const useStore = defineStore('admin', {
    state: () => {
        return { 
            chapter: localStorage.getItem('skos-chapter') ?? 1,
            chapterStatus: localStorage.getItem('skos-chapter-status') ?? 'main',
            userIdx: localStorage.getItem('skos-user-idx') ?? 0,
            menu: localStorage.getItem('skos-menu') ?? 3,
            menuStatus: localStorage.getItem('skos-menu-status') ?? 'main',
            roleId: localStorage.getItem('skos-role-id') ?? 1,
            directions: [],
            divisions: [],
            roles: [],
            professions: {},
            sections: [],
            users: [],
            positions: [],
            role: {
                'perm_admin_panel': {'access': '-'},
                'perm_directions': {'access': '-'},
                'perm_divisions': {'access': '-'},
                'perm_profession_groups': {'access': '-'},
                'perm_professions': {'access': '-'},
                'perm_sections': {'access': '-'},
                'perm_roles': {'access': '-'},
                'perm_users': {'access': '-'},
                'perm_notifications': {'access': '-'},
                'perm_plan_schedule': {'access': '-'},
                'perm_statement': {'access': '-'},
                'perm_companies': {'access': '-'},
                'perm_positions': {'access': '-'}
            },
            user: {
                'surname': '',
                'name': '',
                'patronymic': '',
                'phone_number': '',
            },
            academic_year: localStorage.getItem('skos-year') ?? date.getFullYear(),
            plan: {
                'arr_plan': [],
            },
            statement: null,
            notify: null,
            notifyId: null,
            companies: null,
         }
    },
    actions: {},
});