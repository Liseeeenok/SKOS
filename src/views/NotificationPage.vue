<script setup>
import MenuNav from '../components/MenuNav.vue';
import Notification from '../components/Notification.vue';
import Error from '../components/Error.vue';
import { useStore } from '../stores/PlanStore';
//------------------------------------
const admin = useStore();
</script>

<template>
    <div class="wrapper">
        <MenuNav/>
        <div v-if="admin.menu == 'notification' && admin.menuStatus == 'main'" class="main"><Notification/></div>
        <div v-else><Error/></div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100vw;
}
.main {
    margin: auto;
    max-width: 1660px;
    height: calc(100vh - 86px);
    background-color: #fafafa;
}
</style>