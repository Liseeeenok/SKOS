<script setup>
import router from '../router';
import { useStore } from '../stores/PlanStore';
//------------------------------------
const admin = useStore();
function delLocal() {
    localStorage.removeItem('skos-token');
    localStorage.removeItem('skos-dir');
    router.push('/');
}
function changeMenu(index) {
    admin.menu = index;
    admin.menuStatus = 'main';
    localStorage.setItem('skos-menu', index);
    localStorage.setItem('skos-menu-status', 'main');
}
</script>

<template>
    <nav class="nav">
        <div class="menu_item" :class="admin.menu == 1 ? 'active' : ''" @click="changeMenu(1)">
            <div style="min-width: 264px;">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/5909015.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Администрирование</div>
            </div>
        </div>
        <div class="menu_item" :class="admin.menu == 2 ? 'active' : ''" @click="changeMenu(2)">
            <div style="min-width: 139px;">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/3106773.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Профиль</div>
            </div>
        </div>
        <div class="menu_item" :class="admin.menu == 3 ? 'active' : ''" @click="changeMenu(3)">
            <div style="min-width: 186px;">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/6824079.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Уведомления</div>
            </div>
        </div>
        <div class="menu_item" :class="admin.menu == 4 ? 'active' : ''" @click="changeMenu(4)">
            <div style="min-width: 145px">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/8500036.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Обучение</div>
            </div>
        </div>
        <div @click="delLocal()" class="menu_item">
            <div style="min-width: 107px">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/1286969.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Выход</div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav {
    padding: 99px 14.4% 0 20.7%;
    display: flex;
    justify-content: space-between;
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
}
.active {
    background: rgba(103, 96, 106, 0.50);
}
.menu_item:hover {
    background: rgba(182, 168, 189, 0.50);
}
</style>