<script setup>
import MenuNav from '../components/MenuNav.vue';
import Notification from '../components/Notification.vue';
import { useStore } from '../stores/PlanStore';
//------------------------------------
const admin = useStore();
admin.menu = 'notification';
localStorage.setItem('skos-menu', 'notification');
</script>

<template>
    <div class="wrapper">
        <MenuNav/>
        <div class="main"><Notification/></div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100vw;
}
.main {
    margin: 30px auto 0px;
    max-width: 1660px;
    height: calc(100vh - 120px);
    overflow: auto;
    border-radius: 8px;
}
.test {
    background-color: #fafafa;
}
</style>