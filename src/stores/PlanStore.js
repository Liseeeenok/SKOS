import { defineStore } from "pinia";

export const useStore = defineStore('admin', {
    state: () => {
        return { 
            chapter: 1,
            roleId: localStorage.getItem('skos-role-id') ?? 1,
            directions: null,
            divisions: null,
            roles: null,
            professions: null,
            sections: null,
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
            },
         }
    },
    actions: {
        setChapter(chapter) {
            this.chapter = chapter
        },
        setRoleId(roleId) {
            this.roleId = roleId;
            admin.role = admin.roles.find(x => x.id == admin.roleId);
        },
        setDirections(directions) {
            this.directions = directions
        },
        setDivisions(divisions) {
            this.divisions = divisions
        },
        setRoles(roles) {
            this.roles = roles
        },
        setProfessions(professions) {
            this.professions = professions
        },
        setSections(sections) {
            this.sections = sections
        },
    },
});