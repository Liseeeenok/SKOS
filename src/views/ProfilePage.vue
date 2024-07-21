<script setup>
import MenuNav from '../components/MenuNav.vue';
import ProfileVue from '../components/Profile.vue';
import { useStore } from '../stores/PlanStore';
//------------------------------------
const admin = useStore();
admin.menu = 'profile';
localStorage.setItem('skos-menu', 'profile');
</script>

<template>
    <div class="wrapper">
        <MenuNav/>
        <div class="main"><ProfileVue/></div>
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
}
</style>
