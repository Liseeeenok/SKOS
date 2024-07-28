<script setup>
import { ref } from 'vue';
import router from '../router';
const menuItem = ref('/');
router.beforeEach((to,from,next) => {menuItem.value = to.path; next()});
function logOut() {
    localStorage.removeItem('skos-token');
    router.push('/');
}
</script>

<template>
    <nav class="nav" v-if="menuItem !== '/'">
        <img alt="СКОС" class="shape" src="@/assets/logo.svg" width="66" height="66" draggable="false"/>

        <router-link to="/admin" class="menu_item">
            <div style="min-width: 264px;">
                <div class="icon"><img src="./icons/5909015.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Администрирование</div>
            </div>
        </router-link>
        <router-link to="/profile" class="menu_item">
            <div style="min-width: 139px;">
                <div class="icon"><img src="./icons/3106773.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Профиль</div>
            </div>
        </router-link>
        <router-link to="/notification" class="menu_item">
            <div style="min-width: 186px;">
                <div class="icon"><img src="./icons/6824079.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Уведомления</div>
            </div>
        </router-link>
        <router-link to="/training" class="menu_item">
            <div style="min-width: 145px">
                <div class="icon"><img src="./icons/8500036.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Обучение</div>
            </div>
        </router-link>
        <div @click="logOut()" class="menu_item">
            <div style="min-width: 107px">
                <div class="icon"><img src="./icons/1286969.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Выход</div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav {
    margin: 10px auto 0px;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;

    .shape {
        cursor: pointer;
    }

    .menu_item {
        color: #000;
        font-family: Arial;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        border-radius: 20px;
        padding: 15px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background: rgba(182, 168, 189, 0.50);
        }

        .icon {
            display: inline-block;
            vertical-align:middle;
            margin-right:5px;
        }
    }

    .router-link-active {
        &.menu_item {
            background: rgb(255 255 255 / 50%);
        }
    }
}
</style>