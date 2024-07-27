<script setup>
import { ref } from 'vue';
import AdminDivision from './AdminDivision.vue';
import AdminSection from './AdminSection.vue';
import AdminDirection from './AdminDirection.vue';
import AdminProfession from './AdminProfession.vue';
import AdminUser from './AdminUser.vue';
import AdminRoles from './AdminRoles.vue';
import AdminPermission from './AdminPermission.vue';
import { useStore } from '../stores/PlanStore';
import AdminUserEdit from './AdminUserEdit.vue';
import AdminCompany from './AdminCompany.vue';
import AdminPosition from './AdminPosition.vue';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const admin = useStore();
function changeMenu(index) {
    admin.chapter = index; 
    admin.chapterStatus = 'main';
    localStorage.setItem('skos-chapter', index)
    localStorage.setItem('skos-chapter-status', 'main')
}
</script>

<template>
    <div class="container">
        <div class="admin">
            <div class="container_menu">
                <div class="menu">
                    <router-link to="/admin/division">
                        <div class="menu_item">Подразделения</div>
                    </router-link>
                    <router-link to="/admin/section">
                        <div class="menu_item">Секции</div>
                    </router-link>
                    <div class="menu_item" :class="admin.chapter == 3 ? 'active':''" @click="changeMenu(3)">Дирекции</div>
                    <div class="menu_item" :class="admin.chapter == 8 ? 'active':''" @click="changeMenu(8)">Предприятия</div>
                    <div class="menu_item" :class="admin.chapter == 4 ? 'active':''" @click="changeMenu(4)">Профессии</div>
                    <div class="menu_item" :class="admin.chapter == 5 ? 'active':''" @click="changeMenu(5)">Пользователи</div>
                    <div class="menu_item" :class="admin.chapter == 6 ? 'active':''" @click="changeMenu(6)">Роли</div>
                    <div class="menu_item" :class="admin.chapter == 7 ? 'active':''" @click="changeMenu(7)">Права</div>
                    <div class="menu_item" :class="admin.chapter == 9 ? 'active':''" @click="changeMenu(9)">Должности</div>
                </div>
            </div>
            <div class="container_content">
                <router-view></router-view>
                <template v-if="admin.chapter == 3"><AdminDirection/></template>
                <template v-if="admin.chapter == 4"><AdminProfession/></template>
                <template v-if="admin.chapter == 5 && admin.chapterStatus == 'main'"><AdminUser/></template>
                <template v-if="admin.chapter == 5 && admin.chapterStatus == 'edit'"><AdminUserEdit/></template>
                <template v-if="admin.chapter == 6"><AdminRoles/></template>
                <template v-if="admin.chapter == 7"><AdminPermission/></template>
                <template v-if="admin.chapter == 8"><AdminCompany/></template>
                <template v-if="admin.chapter == 9"><AdminPosition/></template>
            </div>
        </div>
    </div>
</template>

<style lang="scss"scoped>
.container {
    padding: 10px 20px 0 20px;

    .admin {
        display: flex;

        .container_menu {
            padding-right: 20px;

            .menu_item {
                font-size: 24px;
                cursor: pointer;
                transition: 0.2s;
                padding: 10px 20px;
                border-radius: 10px;
                margin: 5px 0;
                color: black;

                &:hover {
                    background: rgba(182, 168, 189, 0.50);
                    transform: scale(1.1);
                }
            }

            .router-link-active {
                .menu_item {
                    background: rgb(255 255 255 / 50%);
                }
            }
        }

        .container_content {
            padding-bottom: 50px;
        }
    }
}
</style>
