<script setup>
import { useStore } from '../stores/PlanStore';
import { getDivision, saveDivision } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getDivision();
//------------------------------------
function setStatus(index_division) {
    if (admin.divisions[index_division].status != 2) admin.divisions[index_division].status = 1;
}
function addDivision() {
    admin.divisions.push({'id': null, 'name': '', 'status': 2});
}
function deleteDivision(index_division) {
    let result = confirm(`Вы уверены что хотите удалить подразделение ${admin.divisions[index_division].name}?`);
    if (result) {
        admin.divisions[index_division].status != 2 ? admin.divisions[index_division].status = 0 : admin.divisions[index_division].status = 3;
        saveDivision();
    }
}
//------------------------------------
</script>
<template>
    <h1>Настройка подразделений</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(division, index_division) in admin.divisions" :key="index_division">
                <tr v-if="division.status != 0 && division.status != 3">
                    <td>{{ division.id}}</td>
                    <td><input type="text" v-model="division.name" @change="setStatus(index_division)"/></td>
                    <td>
                        <button class="red" @click="deleteDivision(index_division)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveDivision()">Сохранить</button>
    <button class="add" @click="addDivision()">Добавить подразделение</button>
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
    width: 400px;
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