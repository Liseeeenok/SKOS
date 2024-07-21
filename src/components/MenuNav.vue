<script setup>
import { changeMenu, logOut } from '../helpers/navigation';
import { useStore } from '../stores/PlanStore';
//------------------------------------
const admin = useStore();
</script>

<template>
    <nav class="nav">
        <img alt="СКОС" class="shape" src="@/assets/logo.svg" width="66" height="66" draggable="false"/>
        <div class="menu_item" :class="admin.menu == 'admin' ? 'active' : ''" @click="changeMenu('admin')">
            <div style="min-width: 264px;">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/5909015.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Администрирование</div>
            </div>
        </div>
        <div class="menu_item" :class="admin.menu == 'profile' ? 'active' : ''" @click="changeMenu('profile')">
            <div style="min-width: 139px;">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/3106773.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Профиль</div>
            </div>
        </div>
        <div class="menu_item" :class="admin.menu == 'notification' ? 'active' : ''" @click="changeMenu('notification')">
            <div style="min-width: 186px;">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/6824079.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Уведомления</div>
            </div>
        </div>
        <div class="menu_item" :class="admin.menu == 'training' ? 'active' : ''" @click="changeMenu('training')">
            <div style="min-width: 145px">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/8500036.png" width="30" height="30"/></div>
                <div style="display: inline-block;">Обучение</div>
            </div>
        </div>
        <div @click="logOut()" class="menu_item">
            <div style="min-width: 107px">
                <div style="display: inline-block;vertical-align:middle;margin-right:5px;"><img src="./icons/1286969.png" width="30" height="30"/></div>
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
    background: rgb(255 255 255 / 50%);
}
.menu_item:hover {
    background: rgba(182, 168, 189, 0.50);
}
.shape {
    cursor: pointer;
}
</style>