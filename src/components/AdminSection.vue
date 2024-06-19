<script setup>
import { useStore } from '../stores/PlanStore';
import { getSection, saveSection } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getSection();
//------------------------------------
function setStatus(index_section) {
    if (admin.sections[index_section].status != 2) admin.sections[index_section].status = 1;
}
function addSection() {
    admin.sections.push({'id':null, 'name': '', 'status': 2});
}
function deleteSection(index_section) {
    let result = confirm(`Вы уверены что хотите удалить направление ${admin.sections[index_section].name}?`);
    if (result) {
        if (admin.sections[index_section].status != 2) admin.sections[index_section].status = 0;
        else admin.sections[index_section].status = 3;
        saveSection();
    }
}
//------------------------------------
</script>
<template>
    <h1>Настройка секций</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(section, index_section) in admin.sections" :key="index_section">
                <tr v-if="section.status != 0 && section.status != 3">
                    <td>{{ section.id}}</td>
                    <td><input type="text" v-model="section.name" @change="setStatus(index_section)"/></td>
                    <td>
                        <button class="red" @click="deleteSection(index_section)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveSection()">Сохранить</button>
    <button class="add" @click="addSection()">Добавить направление</button>
</template>

<style scoped>
table {
    border-collapse: collapse;
}
th {
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
td {
    padding: 5px 10px;
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #000;
}
input {
    padding: 5px 10px;
    font-size: 20px;
    width: 1000px;
}
button {
    padding: 5px 10px;
    font-size: 20px;
    margin: 0 10px;
    border-radius: 5px;
    border: solid 1px #000;
    cursor: pointer;
    transition: 0.15s;
}
button:hover {
    transform: scale(1.05);
}
.green {
    color: black;
    background-color: #2a9630b0;
}
.red {
    background-color: #cc5e5e;
}
.add {
    margin: 15px 0 0 0;
}
</style>