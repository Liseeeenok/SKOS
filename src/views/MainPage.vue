<script setup>
import MenuNav from '../components/MenuNav.vue';
import Admin from '../components/Admin.vue';
import Profile from '../components/Profile.vue';
import Notification from '../components/Notification.vue';
import Training from '../components/Training.vue';
import Development from '../components/Development.vue';
import DevelopmentEdit from '../components/DevelopmentEdit.vue';
import Statement from '../components/Statement.vue';
import StatementEdit from '../components/StatementEdit.vue';
import { useStore } from '../stores/PlanStore';
//------------------------------------
const admin = useStore();
</script>

<template>
    <div class="wrapper">
        <MenuNav/>
        <template v-if="admin.menu == 1"><Admin/></template>
        <template v-if="admin.menu == 2"><Profile/></template>
        <template v-if="admin.menu == 3"><Notification/></template>
        <template v-if="admin.menu == 4 && admin.menuStatus == 'main'"><Training/></template>
        <template v-if="admin.menu == 4 && admin.menuStatus == 'developmentView'"><Development/></template>
        <template v-if="admin.menu == 4 && admin.menuStatus == 'developmentEdit'"><DevelopmentEdit/></template>
        <template v-if="admin.menu == 4 && admin.menuStatus == 'statementView'"><Statement/></template>
        <template v-if="admin.menu == 4 && admin.menuStatus == 'statementEdit'"><StatementEdit/></template>
    </div>
</template>

<style scoped>

</style>