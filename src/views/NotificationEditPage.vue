<script setup>
import MenuNav from '../components/MenuNav.vue';
import NotificationEdit from '../components/NotificationEdit.vue';
import { useStore } from '../stores/PlanStore';
//------------------------------------
const admin = useStore()
admin.menu = 'notification';
localStorage.setItem('skos-menu', 'notification');
</script>

<template>
    <div class="wrapper">
        <MenuNav/>
        <div class="main"><NotificationEdit/></div>
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
    background-color: #fafafa;
    overflow: auto;
}
</style>