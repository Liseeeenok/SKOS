<script setup>
import { useStore } from '../stores/PlanStore';
import { getCompany, getDirection, saveCompany } from '../helpers/API.js';
//------------------------------------
const admin = useStore();
getCompany();
getDirection();
//------------------------------------
function setStatus(index_company) {
    if (admin.companies[index_company].status != 2) admin.companies[index_company].status = 1;
}
function addCompany() {
    admin.companies.push({'id': null, 'id_direction': null, 'name': '', 'status': 2});
}
function deleteCompany(index_company) {
    let result = confirm(`Вы уверены что хотите удалить компанию ${admin.companies[index_company].name}?`);
    if (result) {
        admin.companies[index_company].status != 2 ? admin.companies[index_company].status = 0 : admin.companies[index_company].status = 3;
        saveCompany();
    }
}
//------------------------------------
</script>

<template>
    <h1>Настройка предприятий</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Дирекция</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(company, index_company) in admin.companies" :key="index_company">
                <tr v-if="company.status != 0 && company.status != 3">
                    <td>{{ company.id}}</td>
                    <td><input type="text" v-model="company.name" @change="setStatus(index_company)"/></td>
                    <td>
                        <select v-model="company.id_direction" @change="setStatus(index_company)">
                        <template v-for="(direction, index_direction) in admin.directions" :key="index_direction">
                            <option :value="direction.id">{{ direction.name }}</option>
                        </template>
                    </select>
                    </td>
                    <td>
                        <button class="red" @click="deleteCompany(index_company)">Удалить</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <button class="green" @click="saveCompany()">Сохранить</button>
    <button class="add" @click="addCompany()">Добавить предприятие</button>
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
select {
    padding: 5px 10px;
    font-size: 20px;
    width: 350px;
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