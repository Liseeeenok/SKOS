<script setup>
import { ref } from 'vue';
import AdminDivision from './AdminDivision.vue';
import AdminSection from './AdminSection.vue';
import AdminDirection from './AdminDirection.vue';
import AdminProfession from './AdminProfession.vue';
const host = 'mypew.ru:7070'; //имя или ip хоста api
const level = localStorage.getItem('skos-role');
const chapter = ref(localStorage.getItem('skos-menu') ?? 1);
function changeMenu(index) {
    chapter.value = index; 
    localStorage.setItem('skos-menu', index)
}
</script>

<template>
    <div class="container">
        <div class="admin">
            <div class="container_menu">
                <div class="menu">
                    <div class="menu_item" :class="chapter == 1 ? 'active':''" @click="changeMenu(1)">Подразделения</div>
                    <div class="menu_item" :class="chapter == 2 ? 'active':''" @click="changeMenu(2)">Направления</div>
                    <div class="menu_item" :class="chapter == 3 ? 'active':''" @click="changeMenu(3)">Дирекции</div>
                    <div class="menu_item" :class="chapter == 4 ? 'active':''" @click="changeMenu(4)">Профессии</div>
                </div>
            </div>
            <div class="container_content">
                <template v-if="chapter == 1"><AdminDivision/></template>
                <template v-if="chapter == 2"><AdminSection/></template>
                <template v-if="chapter == 3"><AdminDirection/></template>
                <template v-if="chapter == 4"><AdminProfession/></template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 100px 20px 0 20px;
}

.admin {
    display: flex;
}

.container_menu {
    padding-right: 20px;
}

.menu_item {
    font-size: 24px;
    cursor: pointer;
    transition: 0.2s;
    padding: 10px 20px;
    border-radius: 10px;
    margin: 5px 0;
}
.menu_item:hover {
    background: rgba(182, 168, 189, 0.50);
    transform: scale(1.1);
}
.active {
    background: rgba(154, 138, 161, 0.5);
}
.container_content {
    padding-bottom: 50px;
}
</style>
