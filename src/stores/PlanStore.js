import { defineStore } from "pinia";

export const useStore = defineStore('admin', {
    state: () => {
        return { 
            chapter: 1,
            roleId: 0
         }
    },
    actions: {
        setChapter(chapter) {
            this.chapter = chapter
        },
        setRoleId(roleId) {
            this.roleId = roleId
        },
    },
});