<script setup>
import { useStore } from '../stores/PlanStore';
import { getProfession, saveProfession, max } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getProfession();
//------------------------------------
function setStatus(index_profession) {
    if (admin.professions[index_profession].status != 2) admin.professions[index_profession].status = 1;
}
function setStatusGroup(index_profession, index_group) {
    admin.professions[index_profession].groups[index_group].id_profession = admin.professions[index_profession].id;
    if (admin.professions[index_profession].groups[index_group].status != 2) {
        if (admin.professions[index_profession].groups[index_group].name == "") admin.professions[index_profession].groups[index_group].status = 0;
        else admin.professions[index_profession].groups[index_group].status = 1;
    }
}
function addProfession() {
    admin.professions.push({'id':null, 'name': '', 'status': 2, 'groups': []});
}
function addGroup(index_profession) {
    admin.professions[index_profession].groups.push({'id':null, 'name': '', 'status': 2});
}
function deleteProfession(index_profession) {
    let result = confirm(`Вы уверены что хотите удалить профессию ${admin.professions[index_profession].name}?`);
    if (result) {
        if (admin.professions[index_profession].status != 2) admin.professions[index_profession].status = 0;
        else admin.professions[index_profession].status = 3;
        saveProfession();
    }
}
//------------------------------------
</script>
<template>
    <h1>Настройка профессий</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Группы</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(profession, index_profession) in admin.professions" :key="index_profession">
                <template v-if="profession.status != 0 && profession.status != 3">
                    <tr>
                        <td :rowspan="max(profession.groups.length, 1)">{{ profession.id}}</td>
                        <td :rowspan="max(profession.groups.length, 1)"><input type="text" v-model="profession.name" @change="setStatus(index_profession)"/></td>
                        <td><input v-if="profession.groups[0]" class="groups" type="text" v-model="profession.groups[0].name" @change="setStatusGroup(index_profession, 0)"/></td>
                        <td :rowspan="max(profession.groups.length, 1)">
                            <div class="buttons">
                                <button @click="addGroup(index_profession)">Добавить группу</button>
                                <button class="red" @click="deleteProfession(index_profession)">Удалить</button>
                            </div>
                        </td>
                    </tr>
                    <template v-for="(group, index_group) in profession.groups" :key="index_group">
                        <tr v-if="index_group != 0">
                            <td><input class="groups" type="text" v-model="group.name" @change="setStatusGroup(index_profession, index_group)"/></td>
                        </tr>
                    </template>
                </template>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveProfession()">Сохранить</button>
    <button class="add" @click="addProfession()">Добавить профессию</button>
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
    width: 800px;
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
.groups {
    width: 200px;
}
.buttons {
    display: flex;
}
</style>