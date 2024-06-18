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
         }
    },
    actions: {
        setChapter(chapter) {
            this.chapter = chapter
        },
        setRoleId(roleId) {
            this.roleId = roleId
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
    },
});